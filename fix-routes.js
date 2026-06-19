import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const srcDir = path.join(__dirname, 'src');
const routesDir = path.join(srcDir, 'routes');

function scanDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
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

const allPages = scanDir(path.join(srcDir, 'pages'));
const componentToPath = {};

for (const fp of allPages) {
    const content = fs.readFileSync(fp, 'utf8');
    const relative = path.relative(path.join(srcDir, 'routes'), fp).replace(/\\/g, '/');
    // strip out extension
    const importStr = relative.replace(/\.tsx?$/, '');
    
    // Extract component name from file name or default export
    const filename = path.basename(fp, '.tsx');
    componentToPath[filename] = importStr;
}
// Add generic matches
componentToPath['AccessDenied'] = '../components/AccessDenied';

const routesFiles = fs.readdirSync(routesDir);
for (const rf of routesFiles) {
    if (rf === '__root.tsx') continue;
    const fp = path.join(routesDir, rf);
    let content = fs.readFileSync(fp, 'utf8');
    
    content = content.replace(/import\s*\(\s*['"]([^'"]+)['"]\s*\)/g, (match, p1) => {
        // p1 is like "../pages/SRMDataMaster"
        const baseCompName = path.basename(p1);
        if (componentToPath[baseCompName]) {
            return `import('${componentToPath[baseCompName]}')`;
        }
        return match;
    });
    
    fs.writeFileSync(fp, content, 'utf8');
}

console.log('Fixed lazy imports.');
