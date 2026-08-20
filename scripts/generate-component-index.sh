#!/usr/bin/env bash
# Regenerates component-index.md from what's ACTUALLY installed in
# node_modules/@acko/* — never from memory or design-system docs, which
# have already been found to drift from the real shipped code (see
# DESIGN-SYSTEM-BUGS.md). Run this before starting any new screen.
#
# Usage: ./scripts/generate-component-index.sh > component-index.md

set -euo pipefail
cd "$(dirname "$0")/.."

echo "# ACKO component index"
echo
echo "Generated from \`node_modules/@acko/*\` — ground truth, not documentation."
echo "Regenerate: \`./scripts/generate-component-index.sh > component-index.md\`"
echo
echo "**Before using a component, also check [DESIGN-SYSTEM-BUGS.md](./DESIGN-SYSTEM-BUGS.md)"
echo "for ones with a confirmed live bug** (Card, Typography, Alert as of this writing) —"
echo "existing in this list only means the export exists, not that it renders correctly."
echo

for pkg_dir in node_modules/@acko/*/; do
  pkg=$(basename "$pkg_dir")
  version=$(node -pe "require('./${pkg_dir}package.json').version" 2>/dev/null || echo "?")
  dts="${pkg_dir}dist/index.d.ts"

  echo "## @acko/${pkg} (v${version})"
  echo

  if [ ! -f "$dts" ]; then
    echo "_No dist/index.d.ts found — check package structure manually._"
    echo
    continue
  fi

  # Named exports: `export { X, Y }` and `export type { A, B }`.
  # Portable [[:space:]] trim, not \s — BSD sed (macOS default) has no \s
  # shorthand and silently reads it as a literal "s", eating trailing S's
  # off real names (AlertProps -> AlertProp). Confirmed the hard way.
  exports=$(grep -oE "export (type )?\{[^}]+\}" "$dts" 2>/dev/null \
    | sed -E 's/export (type )?\{//; s/\}//' \
    | tr ',' '\n' \
    | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//; s/^type //' \
    | grep -v '^$' | sort -u)

  if [ -z "$exports" ]; then
    echo "_No named exports parsed — check ${dts} manually._"
  else
    echo "$exports" | sed 's/^/- `/; s/$/`/'
  fi
  echo
done
