const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
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
    
    // Scale up tiny fonts
    content = content.replace(/text-\[8px\]/g, 'text-[13px]');
    content = content.replace(/text-\[9px\]/g, 'text-[14px]');
    content = content.replace(/text-\[10px\]/g, 'text-[15px]');
    content = content.replace(/text-\[11px\]/g, 'text-[16px]');
    
    // Scale up standard sizes
    content = content.replace(/text-xs/g, 'text-lg'); // xs -> lg
    content = content.replace(/text-sm/g, 'text-xl'); // sm -> xl
    
    // Apply professional serif identity
    content = content.replace(/font-black uppercase/g, 'font-serif-professional tracking-wide ');
    
    // Smooth out aggressive decorations
    content = content.replace(/tracking-tighter/g, 'tracking-tight');
    content = content.replace(/italic/g, ''); // User wants professional, italics can be noisy
    
    // Update corner radius for premium feel
    content = content.replace(/rounded-2xl/g, 'rounded-[24px]');
    content = content.replace(/rounded-3xl/g, 'rounded-[32px]');
    content = content.replace(/rounded-\[48px\]/g, 'rounded-[40px]');
    content = content.replace(/rounded-\[56px\]/g, 'rounded-[40px]');
    
    // Inject entrance animations to industrial cards if not present
    if (content.includes('industrial-card') && !content.includes('animate-fade-up')) {
        content = content.replace(/industrial-card/g, 'industrial-card animate-fade-up');
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Global Readability Overhaul: ${files.length} modules synchronized to high-fidelity standards.`);
