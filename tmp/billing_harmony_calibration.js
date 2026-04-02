const fs = require('fs');

const path = './src/app/billing/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Reduce weight from black to bold
content = content.replace(/font-black/g, 'font-bold');

// 2. Add Serif to important names
content = content.replace(/text-xl font-bold text-slate-950 text-slate-950 tracking-tight uppercase leading-none mb-2/g, 'text-xl font-serif-professional tracking-tight text-slate-950 leading-none mb-2');

// 3. Relax labels font size slightly if needed, but the weight is the main issue.
// Actually, let's restore font-serif-professional to the status pill and headings
content = content.replace(/<h1 className="text-3xl md:text-3xl font-bold tracking-tight text-slate-950 text-slate-950 uppercase leading-none">/g, '<h1 className="text-3xl font-serif-professional tracking-tight text-slate-950 uppercase leading-none">');

// 4. Shrink the table row padding slightly for cleaner density
content = content.replace(/py-8/g, 'py-6');
content = content.replace(/px-10/g, 'px-8');

fs.writeFileSync(path, content, 'utf8');
console.log('Billing Harmony Calibration Complete.');
