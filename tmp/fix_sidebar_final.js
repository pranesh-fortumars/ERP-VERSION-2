const fs = require('fs');

const sidebarPath = './src/components/Sidebar.tsx';
let content = fs.readFileSync(sidebarPath, 'utf8');

// fix imports
content = content.replace(/import {([^}]*)} from 'react-icons\/fi';/, "import {$1, FiPlus} from 'react-icons/fi';\nimport { useUI } from '@/context/UIContext';");

// fix useUI call
content = content.replace(/const \[isCollapsed, setIsCollapsed\] = useState\(false\);/, "const { isSidebarCollapsed: isCollapsed, toggleSidebar: toggleCollapse } = useUI();");

// fix onClick toggle
content = content.replace(/onClick={() => setIsCollapsed\(!isCollapsed\)}/, "onClick={toggleCollapse}");

fs.writeFileSync(sidebarPath, content, 'utf8');
console.log('Sidebar.tsx: UI Context and FiPlus fix complete.');
