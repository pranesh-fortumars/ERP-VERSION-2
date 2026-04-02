const fs = require('fs');

const path = './src/app/billing/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Recalibrate Amounts to Serif (matches Manufacturing)
content = content.replace(
    /text-3xl font-bold text-slate-950 text-slate-950 tracking-tight whitespace-nowrap/g, 
    'text-3xl font-serif-professional tracking-tight text-slate-950 whitespace-nowrap'
);

// 2. Reduce label boldness
content = content.replace(/font-bold text-slate-950 uppercase tracking-widest mt-1/g, 'font-medium text-slate-950/60 uppercase tracking-widest mt-1');

// 3. Match Maturity Target alignment
content = content.replace(/text-xl font-bold text-slate-950 text-slate-950 tracking-tight uppercase/g, 'text-xl font-serif-professional tracking-tight text-slate-950 uppercase');

// 4. Align Table Headers to same style
content = content.replace(/th className="px-8 py-4 text-\[14px\] font-bold text-slate-950/g, 'th className="px-8 py-5 text-[13px] font-bold text-slate-950/60');

// 5. Status Pill balance
content = content.replace(/text-\[14px\] font-serif-professional tracking-wide  tracking-\[0\.2em\] border shadow-sm/g, 'text-[12px] font-bold uppercase tracking-[0.2em] border shadow-sm');

fs.writeFileSync(path, content, 'utf8');
console.log('Billing Final Calibration Complete: Professionalism synchronized.');
