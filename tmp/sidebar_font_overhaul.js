const fs = require('fs');

const path = './src/components/Sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Brand Header Scaling
content = content.replace(/text-lg font-serif-professional/g, 'text-xl font-serif-professional');
content = content.replace(/text-\[14px\] font-black text-slate-800 uppercase tracking-\[0\.3em\]/g, 'text-[16px] font-black text-slate-800 uppercase tracking-[0.3em]');

// 2. Section Heading Scaling (Enterprise Node)
content = content.replace(/text-\[15px\] font-black text-blue-600 uppercase tracking-widest/g, 'text-[18px] font-black text-blue-600 uppercase tracking-widest');

// 3. Navigation Label Scaling
content = content.replace(/text-\[15px\] font-serif-professional tracking-wide/g, 'text-[18px] font-serif-professional tracking-wide');
content = content.replace(/text-\[15px\] font-black px-4 py-2/g, 'text-[18px] font-black px-4 py-2'); // Collapsed tooltips

// 4. Multi-Instance Labels
content = content.replace(/text-\[14px\] font-black text-slate-950 uppercase truncate/g, 'text-[16px] font-black text-slate-950 uppercase truncate');
content = content.replace(/text-\[14px\] font-black text-slate-800 uppercase tracking-\[0\.1em\]/g, 'text-[16px] font-black text-slate-800 uppercase tracking-[0.1em]');

fs.writeFileSync(path, content, 'utf8');
console.log('Sidebar Font Scale Overhaul: Maximum Legibility Mode Engaged.');
