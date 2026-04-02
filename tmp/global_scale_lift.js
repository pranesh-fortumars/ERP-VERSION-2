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

    // 1. Lift and Bold Secondary Labels for Stats
    content = content.replace(/text-\[14px\] font-black text-slate-950 uppercase tracking-widest mb-2/g, 'text-[16px] font-black text-slate-950 uppercase tracking-widest mb-3');
    content = content.replace(/text-\[14px\] font-bold text-slate-950 uppercase tracking-\[0\.3em\]/g, 'text-[16px] font-black text-slate-950 uppercase tracking-[0.3em]');
    
    // 2. Lift table headers and action labels
    content = content.replace(/text-\[13px\] font-bold text-slate-950\/60/g, 'text-[15px] font-bold text-slate-950/70');
    content = content.replace(/text-\[12px\] font-bold/g, 'text-[14px] font-bold');
    content = content.replace(/text-\[11px\]/g, 'text-[13px]');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Global Secondary Scale Lift Complete: Universal Legibility for Industry 4.0 Suite.');
