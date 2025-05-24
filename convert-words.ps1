# Script to convert words.txt to TypeScript constant format
# Usage: .\convert-words.ps1

Write-Host "Converting words.txt to TypeScript constant format..."

# Read all words from words.txt
$words = Get-Content "words.txt" | Where-Object { $_.Trim() -ne "" }

# Convert to uppercase and format as TypeScript array
$output = @()
$output += "export const WORD_LIST = ["

# Process words in chunks for better formatting (4 words per line)
for ($i = 0; $i -lt $words.Count; $i += 4) {
    $chunk = @()
    for ($j = $i; $j -lt [Math]::Min($i + 4, $words.Count); $j++) {
        $word = $words[$j].Trim().ToUpper()
        if ($word.Length -eq 5) {  # Only include 5-letter words
            $chunk += "`"$word`""
        }
    }
    if ($chunk.Count -gt 0) {
        $line = "    " + ($chunk -join ", ")
        if ($i + 4 -lt $words.Count) {
            $line += ","
        }
        $output += $line
    }
}

$output += "];"

# Write to output file
$output | Out-File "word-list-constant.ts" -Encoding UTF8

Write-Host "Conversion complete! Output written to word-list-constant.ts"
Write-Host "Total words processed: $($words.Count)"

# Count 5-letter words
$fiveLetterWords = $words | Where-Object { $_.Trim().Length -eq 5 }
Write-Host "5-letter words found: $($fiveLetterWords.Count)"

Write-Host ""
Write-Host "You can now copy the content from word-list-constant.ts and paste it into game.ts"
