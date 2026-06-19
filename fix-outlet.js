import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const srcDir = path.join(__dirname, 'src');

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

for (const fp of allPages) {
    let content = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // Replace <Outlet context={{ ... }} /> with <OutletContext.Provider value={{...}}><Outlet /></OutletContext.Provider>
    if (fp.includes('PatientLayout')) {
        content = content.replace('<Outlet context={{ patient }} />', '<PatientContext.Provider value={{ patient }}><Outlet /></PatientContext.Provider>');
        if (!content.includes('PatientContext')) {
            content = "import { PatientContext } from '../../utils/OutletContext';\n" + content;
        }
        changed = true;
    }
    if (fp.includes('PortalKaryawanLayout')) {
        content = content.replace('<Outlet context={{ user }} />', '<KaryawanContext.Provider value={{ user }}><Outlet /></KaryawanContext.Provider>');
        if (!content.includes('KaryawanContext')) {
            content = "import { KaryawanContext } from '../../utils/OutletContext';\n" + content;
        }
        changed = true;
    }

    // Replace imports
    if (content.includes('useOutletContext')) {
        // Remove useOutletContext from @tanstack/react-router imports
        content = content.replace(/useOutletContext\s*,\s*/g, '');
        content = content.replace(/,\s*useOutletContext/g, '');
        // Maybe it's the only import?
        content = content.replace(/import\s*{\s*useOutletContext\s*}\s*from\s*['"]@tanstack\/react-router['"];?/g, '');
        
        // Add at top
        const numFolders = path.relative(path.join(__dirname, 'src'), path.dirname(fp)).split(path.sep).length;
        const up = Array(numFolders).fill('..').join('/');
        
        if (!content.includes('import { useOutletContext }')) {
            content = `import { useOutletContext } from '${up}/utils/OutletContext';\n` + content;
        }
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(fp, content, 'utf8');
    }
}
