const fs = require('fs');

const path = './src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// fix the unclosed motion.div at line 192
content = content.replace(
    /<\/span>\s+<\/div>\s+<\/div>\s+<\/motion\.div>/g, 
    '</span>\n                     </motion.div>\n                   </motion.div>\n                 </motion.div>'
);

// wait, the problem is simpler. 
// let's just find <motion.div ...> and the matching </div> and replace with </motion.div>
// specifically for the patterns created by the script.

content = content.replace(
    /(<motion\.div[^>]*key={i}[^>]*>[\s\S]*?)\s+<\/div>/g,
    '$1\n                   </motion.div>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Dashboard Structural Tags Fixed.');
