#!/usr/bin/env bash
set -Eeuo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
deploy_script="$project_root/scripts/deploy-siteground.sh"
temp_root="$(realpath -e -- "${TMPDIR:-/tmp}")"
fixture="$(mktemp -d "$temp_root/legatech-deploy-test.XXXXXX")"

cleanup() {
  if [[ -d "$fixture" && "$(realpath -e -- "$fixture")" == "$temp_root"/legatech-deploy-test.* ]]; then
    rm -rf -- "$fixture"
  fi
}
trap cleanup EXIT

site_root="$fixture/site"
target="$site_root/public_html"
deploy_root="$fixture/deploy"
first_id=1111111111111111111111111111111111111111
second_id=2222222222222222222222222222222222222222
third_id=3333333333333333333333333333333333333333
mkdir -p "$target" "$fixture/first" "$fixture/second"
printf 'production\n' > "$site_root/.legatech-environment"
printf 'old site\n' > "$target/index.html"

printf 'first site\n' > "$fixture/first/index.html"
printf '%s\n' "$first_id" > "$fixture/first/legatech-release-$first_id.txt"
tar -czf "$fixture/first.tar.gz" -C "$fixture/first" .

if LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" "$fixture/first.tar.gz" "$target" "$first_id" staging >/dev/null 2>&1; then
  echo 'A production directory accepted a staging deployment.' >&2
  exit 1
fi

LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" "$fixture/first.tar.gz" "$target" "$first_id" production >/dev/null
test "$(< "$target/index.html")" = 'first site'
test "$(< "$deploy_root/backups/$first_id/content/index.html")" = 'old site'

printf 'second site\n' > "$fixture/second/index.html"
printf 'new page\n' > "$fixture/second/new.html"
printf '%s\n' "$second_id" > "$fixture/second/legatech-release-$second_id.txt"
tar -czf "$fixture/second.tar.gz" -C "$fixture/second" .

if LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" "$fixture/second.tar.gz" "$target" "$first_id" production >/dev/null 2>&1; then
  echo 'An existing backup was overwritten.' >&2
  exit 1
fi

LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" "$fixture/second.tar.gz" "$target" "$second_id" production >/dev/null
test "$(< "$target/index.html")" = 'second site'
test ! -e "$target/legatech-release-$first_id.txt"
test -f "$target/new.html"

if LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" --rollback "$target" "$first_id" production >/dev/null 2>&1; then
  echo 'Rollback accepted a release that was not active.' >&2
  exit 1
fi

LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" --rollback "$target" "$second_id" production >/dev/null
test "$(< "$target/index.html")" = 'first site'
test -f "$target/legatech-release-$first_id.txt"
test ! -e "$target/new.html"

LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" --rollback "$target" "$first_id" production >/dev/null
test "$(< "$target/index.html")" = 'old site'
test ! -e "$target/.legatech-manifest"
test ! -e "$target/legatech-release-$first_id.txt"

mkdir -p "$fixture/outside" "$fixture/third/linked"
ln -s "$fixture/outside" "$target/linked"
printf 'must not escape\n' > "$fixture/third/linked/page.html"
tar -czf "$fixture/third.tar.gz" -C "$fixture/third" .
if LEGATECH_DEPLOY_ROOT="$deploy_root" bash "$deploy_script" "$fixture/third.tar.gz" "$target" "$third_id" production >/dev/null 2>&1; then
  echo 'A release followed a target symlink outside public_html.' >&2
  exit 1
fi
test ! -e "$fixture/outside/page.html"

echo 'SiteGround deployment and rollback tests passed.'
