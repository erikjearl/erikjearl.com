#!/usr/bin/env bash
# Convert originals in media/ to web JPEGs in public/assets/ (macOS sips).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/assets

conv() { # conv <source-in-media> <out-name> <width>
  local src="media/$1" out="public/assets/$2.jpg" w="$3"
  sips -s format jpeg -s formatOptions 80 --resampleWidth "$w" "$src" --out "$out" >/dev/null
  echo "wrote $out"
}

conv "elcap.jpg"            elcap           1600
conv "erik.JPG"             erik            1200
conv "gear.HEIC"            gear            1600
conv "topo.jpg"             topo            1600
conv "landscape.HEIC"       landscape       2000
conv "introck.heic"         introck         1600
conv "white rasta.heic"     white-rasta     1600
conv "the cheif.heic"       the-chief       1600
conv "slippery souls.HEIC"  slippery-souls  1600
conv "whodunnit.HEIC"       whodunnit       1600
