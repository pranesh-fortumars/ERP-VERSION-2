const fs = require('fs');

const path = './src/app/billing/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Align Stats Section to vertical layout
content = content.replace(
    /className="industrial-card p-10 bg-white  rounded-\[40px\] border border-slate-200 border-slate-200 shadow-sm flex items-center gap-10/g,
    'className="industrial-card p-10 flex flex-col justify-between bg-white border border-slate-100 shadow-sm rounded-[40px] hover:shadow-2xl transition-all duration-700 relative overflow-hidden group"'
);

// Add the background decoration to the stat cards
content = content.replace(
    /transition-all duration-500"\s+>\s+<div className={`p-8/g,
    'transition-all duration-700 group">\n            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />\n            <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform text-3xl'
);

// 2. Align Heading for the table container
content = content.replace(
    /<div className="industrial-card bg-white  rounded-\[40px\] border border-slate-200 border-slate-200 shadow-sm overflow-hidden flex flex-col">/g,
    '<div className="industrial-card p-10 flex flex-col relative overflow-hidden bg-white border border-slate-100 shadow-sm rounded-[40px] animate-fade-up">'
);

// Add the background decoration to the table container
content = content.replace(
    /<div className="industrial-card p-10 flex flex-col relative overflow-hidden bg-white border border-slate-100 shadow-sm rounded-\[40px\] animate-fade-up">/g,
    '<div className="industrial-card p-10 flex flex-col relative overflow-hidden bg-white border border-slate-100 shadow-sm rounded-[40px] animate-fade-up group">\n          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-[0.03] rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />'
);

// 3. Fix Search Bar and Filter Section
// Make it a proper flex row with padding-less border for alignment
content = content.replace(
    /className="p-10 border-b border-slate-100 border-slate-200 flex flex-col xl:flex-row justify-between items-center gap-8 bg-slate-50\/20 /g,
    'className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10 gap-6'
);

// Fix the search input to be less "chunky"
content = content.replace(
     /className="w-full bg-white  border-none rounded-\[24px\] py-4.5 pl-14 pr-6 text-xl font-bold focus:ring-2 focus:ring-blue-500\/10 outline-none transition-all text-slate-950 shadow-inner"/g,
    'className="w-full bg-slate-50/50 border border-slate-100 rounded-[24px] py-4 pl-14 pr-6 text-base font-medium focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-slate-950 focus:bg-white shadow-sm"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Billing Style Calibration: Absolute Alignment Complete.');
