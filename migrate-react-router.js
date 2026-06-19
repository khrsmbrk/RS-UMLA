import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

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

const files = scanDir(path.join(__dirname, 'src', 'pages'));
files.push(path.join(__dirname, 'src', 'components', 'AccessDenied.tsx'));
files.push(path.join(__dirname, 'src', 'App.tsx'));

let changedFiles = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  if (content.includes('react-router-dom')) {
    content = content.replace(/['"]react-router-dom['"]/g, "'@tanstack/react-router'");
    
    // Navigate with state correctly mapped:  navigate('/path', { state: { ... } }) -> navigate({ to: '/path', state: { ... } })
    // Basic replacements: navigate('/path') -> navigate({ to: '/path' })
    content = content.replace(/navigate\(\s*(`[^`]*`|'[^']*'|"[^"]*")\s*\)/g, "navigate({ to: $1 })");
    
    // For navigate(..., { state: ... }) -> navigate({ to: ..., state: ... })
    // It's trickier to regex safely but let's try a simple one:
    content = content.replace(/navigate\(\s*(`[^`]*`|'[^']*'|"[^"]*")\s*,\s*(\{.*?\})\s*\)/g, (match, p1, p2) => {
      // p2 is { state: { ... } } or similar
      // In tanstack router, state is passed directly inside the option object: navigate({ to: p1, state: ... }) 
      // But let's just spread p2 to be safe if it's already an object.
      // Wait, tanstack router `navigate({ to, state })` is exactly what matches if p2 is `{ state: ... }`
      // Actually we can just do: `navigate({ to: p1, ...p2 })` 
      // Wait, Tanstack Router doesn't allow ...p2 like { state: { serviceType: "RME" } }
      // Ah it does! `navigate({ to: '/...', state: { serviceType: "RME" } })`
      return `navigate({ to: ${p1}, ...${p2} })`;
    });

    // Also replace react-router `<Navigate to="xxx" replace />` with `<Navigate to="xxx" replace />`
    // Wait, `@tanstack/react-router` `Navigate` component expects `to` as strongly typed, but as far as imports it's same name.
    
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
  }
});

console.log('Replaced imports in ' + changedFiles + ' files.');
