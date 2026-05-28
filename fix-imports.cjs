const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]([^'"]+)['"];/g;
let newContent = content;

const lazyImports = [];
newContent = newContent.replace(importRegex, (match, p1, p2) => {
  if (p1 === 'React' || p1 === 'useEffect' || match.includes('react-router-dom') || p2 === './pwaSetup' || p2 === './FirebaseProvider' || p1 === 'FirebaseProvider' || p1 === 'registerSW') {
    return match;
  }
  if (p1.includes('{') || p2.includes('react')) return match; 
  
  lazyImports.push(`const ${p1} = React.lazy(() => import('${p2}'));`);
  return '';
});

newContent = newContent.replace('<FirebaseProvider>', '<FirebaseProvider>\n      <React.Suspense fallback={<div className="flex h-screen items-center justify-center p-4 bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>}>');
newContent = newContent.replace('</FirebaseProvider>', '      </React.Suspense>\n    </FirebaseProvider>');

newContent = newContent.replace("import React, { useEffect } from 'react';", "import React, { useEffect } from 'react';\n" + lazyImports.join('\n'));

fs.writeFileSync('src/App.tsx', newContent);
console.log('Done');
