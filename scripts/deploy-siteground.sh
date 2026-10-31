#!/usr/bin/env bash
set -Eeuo pipefail

mode=deploy
if [[ "${1:-}" == --rollback ]]; then
  mode=rollback
  archive=""
else
  archive="${1:?Nedostaje arhiva}"
fi
target="${2:?Nedostaje ciljni direktorij}"
release_id="${3:?Nedostaje identifikator izdanja}"
environment="${4:?Nedostaje oznaka okruženja}"
deploy_root="${LEGATECH_DEPLOY_ROOT:-$HOME/legatech-deploy}"
release_dir="$deploy_root/releases/$release_id"
backup_dir="$deploy_root/backups/$release_id"
backup_content_dir="$backup_dir/content"
previous_manifest="$target/.legatech-manifest"
new_manifest="$release_dir/.legatech-new-manifest"

if [[ "$target" != /* || "$target" == "/" || ! "$release_id" =~ ^[a-f0-9]{40}$ ]]; then
  echo "Nesiguran ciljni direktorij: $target" >&2
  exit 1
fi

if [[ ! -d "$target" || -L "$target" || "$target" != */public_html || "$target" == /public_html || "$(realpath -e -- "$target")" != "$target" ]]; then
  echo "Cilj mora biti postojeći stvarni public_html direktorij: $target" >&2
  exit 1
fi

environment_marker="$(dirname "$target")/.legatech-environment"
if [[ "$environment" != staging && "$environment" != production ]] || [[ ! -f "$environment_marker" ]] || [[ "$(< "$environment_marker")" != "$environment" ]]; then
  echo "Ciljni direktorij nije potvrđen za okruženje $environment." >&2
  exit 1
fi

validate_relative_path() {
  local relative="$1"
  [[ -n "$relative" && "$relative" != /* && "$relative" != ../* && "$relative" != */../* && "$relative" != */.. ]] || return 1
  [[ "$(realpath -m -- "$target/$relative")" == "$target/"* ]]
}

rollback() {
  local exit_code="${1:-$?}"
  trap - ERR
  echo "Vraćam prethodno izdanje." >&2
  while IFS= read -r relative; do
    validate_relative_path "$relative" || { echo "Nesigurna putanja u manifestu" >&2; exit 1; }
  done < "$new_manifest"
  while IFS= read -r relative; do
    rm -f "$target/$relative"
  done < "$new_manifest"
  if [[ -d "$backup_content_dir" ]]; then
    rsync -a "$backup_content_dir/" "$target/"
  fi
  if [[ -f "$backup_dir/previous-manifest" ]]; then
    cp -p "$backup_dir/previous-manifest" "$previous_manifest"
  else
    rm -f "$previous_manifest"
  fi
  exit "$exit_code"
}

if [[ "$mode" == rollback ]]; then
  release_marker="$target/legatech-release-$release_id.txt"
  if [[ ! -d "$backup_dir" || ! -f "$new_manifest" || ! -f "$release_marker" || "$(< "$release_marker")" != "$release_id" ]]; then
    echo "Povrat nije dopušten: ovo izdanje nije aktivno ili sigurnosna kopija nedostaje." >&2
    exit 1
  fi
  rollback 0
fi

if [[ ! -f "$archive" || -L "$archive" || -e "$release_dir" || -L "$release_dir" || -e "$backup_dir" || -L "$backup_dir" ]]; then
  echo "Arhiva nedostaje ili identifikator izdanja već postoji." >&2
  exit 1
fi

mkdir -p "$deploy_root/incoming" "$(dirname "$release_dir")" "$(dirname "$backup_dir")"
mkdir -p "$release_dir" "$backup_content_dir"

archive_listing="$(mktemp "$deploy_root/incoming/archive-list.XXXXXX")"
trap 'rm -f "$archive_listing"' EXIT
tar -tzf "$archive" > "$archive_listing"

while IFS= read -r entry; do
  case "$entry" in
    /*|../*|*/../*|*/..) echo "Nesigurna putanja u arhivi: $entry" >&2; exit 1 ;;
  esac
done < "$archive_listing"

rm -f "$archive_listing"
trap - EXIT

tar -xzf "$archive" -C "$release_dir"
if [[ -n "$(find "$release_dir" -type l -print -quit)" ]]; then
  echo "Arhiva ne smije sadržavati simboličke poveznice." >&2
  exit 1
fi

# Read-only checks before any live content is replaced. Never echo credentials.
if [[ ! -f "$release_dir/legatech-release-$release_id.txt" || "$(< "$release_dir/legatech-release-$release_id.txt")" != "$release_id" ]]; then
  echo "Missing or mismatched CI release marker." >&2
  exit 1
fi
php -r '
  $design = json_decode(file_get_contents($argv[1]), true);
  if (!is_array($design) || ($design["design"] ?? "") !== "approved-expressive-plum-pistachio" || ($design["publicAddressApproved"] ?? false) !== true || ($design["debugMode"] ?? true) !== false || ($design["mailMode"] ?? "") !== "smtp") { fwrite(STDERR, "Unapproved or non-production redesign artifact.\n"); exit(1); }
  if (version_compare(PHP_VERSION, "8.1", "<") || !extension_loaded("openssl") || !extension_loaded("mbstring")) { fwrite(STDERR, "Production PHP requirements are not met.\n"); exit(1); }
  $config = dirname($argv[2]) . "/private/legatech-contact.php";
  if (!is_file($config) || !is_readable($config)) { fwrite(STDERR, "Private SMTP configuration is unavailable.\n"); exit(1); }
  $c = require $config;
  foreach (["smtp_host", "smtp_port", "smtp_username", "smtp_password", "from_email", "recipient_email", "rate_limit_salt"] as $key) if (empty($c[$key])) { fwrite(STDERR, "SMTP configuration is incomplete.\n"); exit(1); }
  if (!in_array($c["smtp_encryption"] ?? "", ["ssl", "tls"], true) || strlen($c["rate_limit_salt"]) < 24 || !in_array("https://legatech.hr", $c["allowed_origins"] ?? [], true) || !filter_var($c["from_email"], FILTER_VALIDATE_EMAIL) || !filter_var($c["recipient_email"], FILTER_VALIDATE_EMAIL) || (str_ends_with(strtolower($c["recipient_email"]), ".test") || str_ends_with(strtolower($c["recipient_email"]), ".invalid")) || in_array($c["smtp_password"], ["local", "PROMIJENITE_OVU_VRIJEDNOST"], true) || $c["smtp_host"] === "smtp.example.com") { fwrite(STDERR, "SMTP settings are test placeholders or unsafe for production.\n"); exit(1); }
  echo "Redesign approval and private production SMTP settings passed preflight. No email was sent.\n";
' "$release_dir/legatech-design.json" "$target"

find "$release_dir" -type f ! -name '.legatech-new-manifest' -printf '%P\n' | LC_ALL=C sort > "$new_manifest"
while IFS= read -r relative; do
  validate_relative_path "$relative" || { echo "Nesigurna putanja u novom manifestu" >&2; exit 1; }
done < "$new_manifest"

if [[ -f "$previous_manifest" ]]; then
  while IFS= read -r relative; do
    validate_relative_path "$relative" || { echo "Nesigurna putanja u starom manifestu" >&2; exit 1; }
    if [[ -f "$target/$relative" ]]; then
      mkdir -p "$backup_content_dir/$(dirname "$relative")"
      cp -p "$target/$relative" "$backup_content_dir/$relative"
    fi
  done < "$previous_manifest"
  cp -p "$previous_manifest" "$backup_dir/previous-manifest"
elif find "$target" -mindepth 1 -print -quit | grep -q .; then
  echo "Prvi deploy: izrađujem potpunu sigurnosnu kopiju postojećeg public_html sadržaja."
  rsync -a "$target/" "$backup_content_dir/"
fi

trap 'rollback $?' ERR

rsync -a --exclude='.legatech-new-manifest' "$release_dir/" "$target/"

if [[ -f "$previous_manifest" ]]; then
  comm -23 "$previous_manifest" "$new_manifest" | while IFS= read -r relative; do
    validate_relative_path "$relative" || continue
    rm -f "$target/$relative"

    candidate_dir="$(dirname "$target/$relative")"
    while [[ "$candidate_dir" != "$target" && "$candidate_dir" == "$target/"* ]]; do
      if rmdir "$candidate_dir" 2>/dev/null; then
        candidate_dir="$(dirname "$candidate_dir")"
      else
        break
      fi
    done
  done
fi

manifest_temp="$target/.legatech-manifest.tmp"
cp "$new_manifest" "$manifest_temp"
mv "$manifest_temp" "$previous_manifest"
trap - ERR
rm -f "$archive"
echo "Aktivirano izdanje $release_id"
