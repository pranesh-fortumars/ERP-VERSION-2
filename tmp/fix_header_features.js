const fs = require('fs');

const headerPath = './src/components/Header.tsx';
let content = fs.readFileSync(headerPath, 'utf8');

// Add activeIndustry
content = content.replace(/import {([^}]*)} from 'react-icons\/fi';/, "import {$1, FiGlobe} from 'react-icons/fi';\nimport { useIndustry } from '@/context/IndustryContext';");
content = content.replace(/const Header = \(\) => {/, "const Header = () => {\n  const { activeIndustry } = useIndustry();");

// Add Search Cmd+K and Active Hub Badge
const headerSearchBlock = `
    <header className="h-24 px-10 hidden lg:flex justify-between items-center sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-blue-500/5 transition-all duration-300">
      <div className="flex-1 flex items-center gap-8">
        <div className="relative group max-w-md w-full">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search operational clusters..." 
            className="w-full bg-slate-50 border border-blue-500/5 rounded-2xl py-3.5 pl-14 pr-16 focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all text-xs outline-none font-black uppercase tracking-widest text-slate-900 shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 font-black text-[9px] shadow-sm">
             <FiCommand size={10} /> K
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-2.5 bg-blue-50/50 rounded-2xl border border-blue-100/50 group hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
           <FiGlobe className="text-blue-600 group-hover:text-white animate-spin-slow" size={16} />
           <div className="text-left">
              <p className="text-[9px] font-black text-slate-900 group-hover:text-white uppercase leading-none mb-1 opacity-60">Active Hub</p>
              <p className="text-[10px] font-black text-blue-600 group-hover:text-white uppercase leading-none italic">{activeIndustry.name}</p>
           </div>
        </div>
      </div>
`;
content = content.replace(/<header[^>]*>([\s\S]*?)<\/header>/, headerSearchBlock.trim() + "      <div className=\"flex items-center gap-4\">" + content.match(/<div className="flex items-center gap-4">([\s\S]*?)<\/header>/)[1] + "    </header>");

fs.writeFileSync(headerPath, content, 'utf8');
console.log('Header.tsx: Features alignment complete.');
