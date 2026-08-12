#!/usr/bin/env bash
set -Eeuo pipefail

archive="${1:?Nedostaje arhiva}"
target="${2:?Nedostaje ciljni direktorij}"
release_id="${3:?Nedostaje identifikator izdanja}"
deploy_root="$HOME/legatech-deploy"
release_dir="$deploy_root/releases/$release_id"
backup_dir="$deploy_root/backups/$release_id"
previous_manifest="$target/.legatech-manifest"
new_manifest="$release_dir/.legatech-new-manifest"

if [[ "$target" != /* || "$target" == "/" ]]; then
  echo "Nesiguran ciljni direktorij: $target" >&2
  exit 1
fi

mkdir -p "$release_dir" "$backup_dir" "$target"

while IFS= read -r entry; do
  case "$entry" in
    /*|../*|*/../*|*/..) echo "Nesigurna putanja u arhivi: $entry" >&2; exit 1 ;;
  esac
done < <(tar -tzf "$archive")

tar -xzf "$archive" -C "$release_dir"
find "$release_dir" -type f ! -name '.legatech-new-manifest' -printf '%P\n' | LC_ALL=C sort > "$new_manifest"

validate_relative_path() {
  local relative="$1"
  [[ -n "$relative" && "$relative" != /* && "$relative" != ../* && "$relative" != */../* && "$relative" != */.. ]]
}

if [[ -f "$previous_manifest" ]]; then
  while IFS= read -r relative; do
    validate_relative_path "$relative" || { echo "Nesigurna putanja u starom manifestu" >&2; exit 1; }
    if [[ -f "$target/$relative" ]]; then
      mkdir -p "$backup_dir/$(dirname "$relative")"
      cp -p "$target/$relative" "$backup_dir/$relative"
    fi
  done < "$previous_manifest"
  cp -p "$previous_manifest" "$backup_dir/.legatech-manifest"
fi

rollback() {
  local exit_code=$?
  trap - ERR
  echo "Deploy nije uspio. Vraćam prethodno izdanje." >&2
  while IFS= read -r relative; do
    validate_relative_path "$relative" && rm -f "$target/$relative"
  done < "$new_manifest"
  if [[ -d "$backup_dir" ]]; then
    cp -a "$backup_dir/." "$target/"
  fi
  exit "$exit_code"
}
trap rollback ERR

rsync -a --exclude='.legatech-new-manifest' "$release_dir/" "$target/"

if [[ -f "$previous_manifest" ]]; then
  comm -23 "$previous_manifest" "$new_manifest" | while IFS= read -r relative; do
    validate_relative_path "$relative" || continue
    rm -f "$target/$relative"
  done
fi

manifest_temp="$target/.legatech-manifest.tmp"
cp "$new_manifest" "$manifest_temp"
mv "$manifest_temp" "$previous_manifest"
trap - ERR
rm -f "$archive"
echo "Aktivirano izdanje $release_id"
