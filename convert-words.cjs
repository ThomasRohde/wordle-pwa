const fs = require('fs');

console.log('Converting words.txt to TypeScript constant format...');

try {
    // Check if words.txt exists
    if (!fs.existsSync('words.txt')) {
        throw new Error('words.txt not found in current directory');
    }
    
    // Read all words from words.txt
    const content = fs.readFileSync('words.txt', 'utf8');
    console.log('File read successfully, content length:', content.length);
    
    const allWords = content.split('\n').map(word => word.trim());
    console.log('Total lines:', allWords.length);
    
    const words = allWords
        .map(word => word.trim().toUpperCase())
        .filter(word => word.length === 5); // Only 5-letter words
    
    console.log('5-letter words found:', words.length);

    // Format as TypeScript array
    let output = 'export const WORD_LIST = [\n';

    // Process words in chunks of 12 for better formatting
    for (let i = 0; i < words.length; i += 12) {
        const chunk = words.slice(i, i + 12);
        const line = '    ' + chunk.map(word => `"${word}"`).join(', ');
        output += line;

        if (i + 12 < words.length) {
            output += ',';
        }
        output += '\n';
    }
    
    output += '];';

    // Write to output file
    fs.writeFileSync('word-list-constant.ts', output);

    console.log('Conversion complete! Output written to word-list-constant.ts');
    console.log(`Total 5-letter words processed: ${words.length}`);
    console.log('');
    console.log('You can now copy the content from word-list-constant.ts and paste it into game.ts');

} catch (error) {
    console.error('Error:', error.message);
}
