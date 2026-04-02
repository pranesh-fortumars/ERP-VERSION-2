const fs = require('fs');

const path = './src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace font sizes for high-fidelity readability
content = content.replace(/text-\[10px\]/g, 'text-[15px]');
content = content.replace(/text-sm/g, 'text-xl');
content = content.replace(/text-xs/g, 'text-lg');
content = content.replace(/text-\[8px\]/g, 'text-[12px]');

// apply serif font for professional impact
content = content.replace(/text-5xl md:text-7xl/g, 'text-6xl md:text-8xl font-serif-professional tracking-tight');
content = content.replace(/className="text-xl font-bold/g, 'className="text-3xl font-serif-professional tracking-tight');

// handle padding for increased font size
content = content.replace(/py-4/g, 'py-6');
content = content.replace(/px-10/g, 'px-16');

// inject more entrance animations
content = content.replace(/<motion\.div/g, '<motion.div');
content = content.replace(/transition={{ duration: 0.8 }}/g, "transition={{ duration: 1.2, ease: 'easeOut' }}");
content = content.replace(/<section className="py-32/g, '<section className="py-48');

// apply floating animations to hero elements
content = content.replace(/className="max-w-7xl/g, 'className="max-w-[1600px]');
content = content.replace(/industrial-card/g, 'industrial-card animate-float');

fs.writeFileSync(path, content, 'utf8');
console.log('LandingPage Typography & Animation Overhaul Complete.');
