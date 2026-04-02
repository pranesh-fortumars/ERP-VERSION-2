const fs = require('fs');

const path = './src/components/Sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Navigation Icon Calibration
content = content.replace(/className={`text-lg transition-all duration-500/g, 'className={`text-xl transition-all duration-500');

// 2. Navigation Pill Selection Indicator Scaling
content = content.replace(/className={`absolute left-0 top-2 bottom-2 w-1.5/g, 'className={`absolute left-0 top-2 bottom-2 w-2');

// 3. Spacing Adjustment for larger fonts
content = content.replace(/gap-4 px-5 py-3/g, 'gap-5 px-6 py-3.5');

fs.writeFileSync(path, content, 'utf8');
console.log('Premium Navigation Calibration Complete: Balanced High-Visibility Suite Active.');
