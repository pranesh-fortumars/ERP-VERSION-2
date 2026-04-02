const fs = require('fs');

const path = './src/components/Sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace font sizes for high-fidelity readability
content = content.replace(/text-\[8px\]/g, 'text-[12px]');
content = content.replace(/text-\[9px\]/g, 'text-[14px]');
content = content.replace(/text-\[10px\]/g, 'text-[15px]');
content = content.replace(/text-\[11px\]/g, 'text-[16px]');
content = content.replace(/text-xs/g, 'text-sm');
content = content.replace(/text-lg/g, 'text-xl font-serif-professional');

// apply serif font for professional impact
content = content.replace(/font-black uppercase/g, 'font-serif-professional tracking-wide ');

// update radius for consistency
content = content.replace(/rounded-2xl/g, 'rounded-3xl');
content = content.replace(/rounded-\[12px\]/g, 'rounded-[16px]');

fs.writeFileSync(path, content, 'utf8');
console.log('Sidebar Typography & Animation Overhaul Complete.');
