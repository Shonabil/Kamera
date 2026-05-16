<?php
/**
 * Auto-detect white/transparent photo slot positions in photobooth templates.
 * Scans the image for bright rectangular areas and outputs their coordinates.
 */

function detectSlots(string $path, int $threshold = 240): array
{
    $img = imagecreatefrompng($path);
    if (!$img) { return []; }

    $w = imagesx($img);
    $h = imagesy($img);

    // Build a binary mask: 1 = bright (slot), 0 = dark (design)
    $mask = [];
    for ($y = 0; $y < $h; $y++) {
        $mask[$y] = [];
        for ($x = 0; $x < $w; $x++) {
            $idx = imagecolorat($img, $x, $y);
            $c   = imagecolorsforindex($img, $idx);
            // A pixel is "bright" if it's white OR fully transparent
            $isBright = ($c['alpha'] === 127) ||
                        ($c['red'] >= $threshold && $c['green'] >= $threshold && $c['blue'] >= $threshold);
            $mask[$y][$x] = $isBright ? 1 : 0;
        }
    }
    imagedestroy($img);

    // Find rows that are mostly bright (>70% bright pixels)
    $slotRows = [];
    for ($y = 0; $y < $h; $y++) {
        $bright = array_sum($mask[$y]);
        if ($bright / $w > 0.70) {
            $slotRows[] = $y;
        }
    }

    // Group consecutive bright rows into bands
    $bands = [];
    if (!empty($slotRows)) {
        $start = $slotRows[0];
        $prev  = $slotRows[0];
        foreach (array_slice($slotRows, 1) as $y) {
            if ($y - $prev > 20) { // gap > 20px = new band
                $bands[] = ['y1' => $start, 'y2' => $prev];
                $start = $y;
            }
            $prev = $y;
        }
        $bands[] = ['y1' => $start, 'y2' => $prev];
    }

    // For each band, find left/right edges to get X and width
    $slots = [];
    foreach ($bands as $band) {
        $midY = (int)(($band['y1'] + $band['y2']) / 2);
        $left = $w; $right = 0;
        for ($x = 0; $x < $w; $x++) {
            if ($mask[$midY][$x] === 1) {
                $left  = min($left, $x);
                $right = max($right, $x);
            }
        }
        $height = $band['y2'] - $band['y1'];
        $width  = $right - $left;
        if ($height > 30 && $width > 30) { // ignore tiny specks
            $slots[] = [
                'x'      => $left,
                'y'      => $band['y1'],
                'width'  => $width,
                'height' => $height,
            ];
        }
    }

    return $slots;
}

$templates = glob('public/images/*.png');

foreach ($templates as $path) {
    $name  = basename($path);
    $slots = detectSlots($path);
    $count = count($slots);

    echo "=== {$name} === ({$count} slot(s) found)\n";
    foreach ($slots as $i => $s) {
        echo "  Slot " . ($i+1) . ": x={$s['x']}, y={$s['y']}, w={$s['width']}, h={$s['height']}\n";
    }

    // Output PHP config line
    if ($count > 0) {
        $slotY = implode(', ', array_column($slots, 'y'));
        $pw = $slots[0]['width'];
        $px = $slots[0]['x'];
        echo "  => PHP: 'photoSize' => {$pw}, 'startX' => {$px}, 'slotPositionsY' => [{$slotY}]\n";
    }
    echo "\n";
}
