const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      scanDir(path.join(dir, file), fileList);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const files = scanDir(path.join(__dirname, 'src', 'pages'));
files.push(path.join(__dirname, 'src', 'components', 'AccessDenied.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace react-router-dom imports
  if (content.includes('react-router-dom')) {
    content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?/g, (match, p1) => {
      let imports = p1.split(',').map(s => s.trim()).filter(s => s);
      let newImports = [];
      const tanstackImports = [];
      
      imports.forEach(imp => {
        if (imp === 'useNavigate') tanstackImports.push('useNavigate');
        else if (imp === 'Link') tanstackImports.push('Link');
        else if (imp === 'useLocation') tanstackImports.push('useLocation');
        else if (imp === 'Outlet') tanstackImports.push('Outlet');
        else if (imp === 'useParams') tanstackImports.push('useParams');
        else if (imp === 'Navigate') tanstackImports.push('Navigate');
      });

      if (tanstackImports.length > 0) {
        return `import { ${tanstackImports.join(', ')} } from '@tanstack/react-router';`;
      }
      return '';
    });
    
    // Convert const navigate = useNavigate();
    // In TanStack Router navigate({ to: '...' }) is used, but we'll try to just keep syntax relatively same or use search-replace.
    // However, string path might just partially work. 
    
    fs.writeFileSync(file, content, 'utf8');
    changed = true;
  }
});
console.log('Done scanning and replacing imports.');
