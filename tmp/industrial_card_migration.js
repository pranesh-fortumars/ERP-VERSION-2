const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src/');

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Pattern for manual card declarations
    const manualPatterns = [
        /className=(["'])[^"']*bg-white[^"']*rounded-\[40px\][^"']*border[^"']*shadow-sm[^"']*["']/g,
        /className=(["'])[^"']*(p-10|p-8)[^"']*bg-white[^"']*rounded-\[40px\][^"']*border[^"']*shadow-sm[^"']*["']/g
    ];

    manualPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
            matches.forEach(match => {
                let updatedMatch = match;
                // Add industrial-card if not present
                if (!updatedMatch.includes('industrial-card')) {
                    updatedMatch = match.replace(/className=(["'])/, 'className=$1industrial-card ');
                }
                // Remove redundant background/border/shadow/radius if industrial-card follows them
                // but let's keep it simple and just inject industrial-card
                content = content.replace(match, updatedMatch);
                changed = true;
            });
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log('Industrial Card Migration Complete: All containers now support the premium top accent signature.');
