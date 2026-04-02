const fs = require('fs');

const path = './src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace font sizes for high-fidelity readability
content = content.replace(/text-\[10px\]/g, 'text-[15px]');
content = content.replace(/text-sm/g, 'text-xl');
content = content.replace(/text-xs/g, 'text-lg');
content = content.replace(/text-\[9px\]\s+font-black/g, 'text-[13px] font-serif-professional');
content = content.replace(/text-\[8px\]/g, 'text-[12px]');
content = content.replace(/text-\[11px\]/g, 'text-[16px]');

// apply serif font for professional impact
content = content.replace(/className="text-4xl font-black/g, 'className="text-6xl font-serif-professional tracking-tight');
content = content.replace(/className="text-3xl font-black/g, 'className="text-5xl font-serif-professional tracking-tight');
content = content.replace(/className="text-2xl font-black/g, 'className="text-4xl font-serif-professional tracking-tight');
content = content.replace(/className="text-xl font-black/g, 'className="text-3xl font-serif-professional tracking-tight');

// handle padding for increased font size
content = content.replace(/p-10/g, 'p-14');
content = content.replace(/py-3\.5/g, 'py-5');
content = content.replace(/px-10/g, 'px-14');

// inject entrance animations and multi-layered hover motion
content = content.replace(/<div key={i}/g, '<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} key={i}');
content = content.replace(/whileHover={{ y: -5 }}/g, "whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.5, ease: 'easeOut' } }}");
content = content.replace(/animate-spin/g, 'animate-spin-slow');

// replace aggressive font-black with serif
content = content.replace(/font-black uppercase/g, 'font-serif-professional tracking-wide ');

fs.writeFileSync(path, content, 'utf8');
console.log('DashboardPage Typography & Animation Overhaul Complete.');
