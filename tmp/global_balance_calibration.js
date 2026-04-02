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
    
    // Scale down from 'Too Big' to 'Balanced High-Fidelity'
    content = content.replace(/text-\[15px\]/g, 'text-[12px]');
    content = content.replace(/text-\[14px\]/g, 'text-[11px]');
    content = content.replace(/text-\[13px\]/g, 'text-[10px]');
    content = content.replace(/text-\[16px\]/g, 'text-[13px]');
    
    // Scale down headings
    content = content.replace(/text-4xl/g, 'text-2xl');
    content = content.replace(/text-5xl/g, 'text-3xl');
    content = content.replace(/text-6xl/g, 'text-4xl');
    content = content.replace(/text-8xl/g, 'text-6xl');
    
    // Scale down standard semantic classes
    content = content.replace(/text-xl/g, 'text-base');
    content = content.replace(/text-lg/g, 'text-sm');
    content = content.replace(/text-2xl/g, 'text-xl'); // Keep some impact for subheadings
    
    // Adjust padding for smaller fonts
    content = content.replace(/p-14/g, 'p-10');
    content = content.replace(/p-12/g, 'p-8');
    content = content.replace(/py-5/g, 'py-3');
    content = content.replace(/py-6/g, 'py-4');
    content = content.replace(/px-16/g, 'px-10');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Global Balance Synchronization: ${files.length} modules recalibrated to high-fidelity enterprise standards.`);
