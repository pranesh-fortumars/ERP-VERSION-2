const fs = require('fs');
const path = require('path');

const patterns = [
  { from: /dark:bg-slate-900/g, to: '' },
  { from: /dark:bg-slate-950/g, to: '' },
  { from: /dark:bg-slate-800/g, to: '' },
  { from: /dark:bg-blue-900/g, to: '' },
  { from: /dark:bg-blue-950/g, to: '' },
  { from: /dark:bg-zinc-900/g, to: '' },
  { from: /dark:bg-zinc-950/g, to: '' },
  { from: /dark:border-slate-800/g, to: 'border-slate-200' },
  { from: /dark:border-slate-700/g, to: 'border-slate-200' },
  { from: /bg-slate-950/g, to: 'bg-white' },
  { from: /bg-slate-900/g, to: 'bg-white' },
  { from: /dark:text-white/g, to: 'text-slate-900' },
  { from: /dark:text-slate-400/g, to: 'text-slate-500' },
  { from: /dark:text-slate-300/g, to: 'text-slate-600' },
  { from: /dark:divide-slate-800/g, to: 'divide-slate-100' },
  { from: /dark:divide-slate-700/g, to: 'divide-slate-100' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const p of patterns) {
        if (p.from.test(content)) {
          content = content.replace(p.from, p.to);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'src/app'));
processDir(path.join(process.cwd(), 'src/components'));
