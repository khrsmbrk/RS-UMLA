import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const srcDir = path.join(__dirname, 'src');
const routesDir = path.join(srcDir, 'routes');

const appContent = fs.readFileSync(path.join(__dirname, 'App.old.tsx'), 'utf-8');

fs.writeFileSync(path.join(routesDir, '__root.tsx'), `import { createRootRoute, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div></div>}>
      <Outlet />
    </Suspense>
  ),
});
`);

const lines = appContent.split('\n');
let prefixes = [];

for (let line of lines) {
  if (line.includes('</Route>')) {
    prefixes.pop();
  }
  
  if (line.includes('<Route')) {
    const pathMatch = line.match(/path=["']([^"']+)["']/);
    const elementMatch = line.match(/element=\{<([A-Za-z0-9_]+)/);
    const isIndex = line.includes('index ');
    
    let pathPart = pathMatch ? pathMatch[1] : '';
    let comp = elementMatch ? elementMatch[1] : '';
    
    if (isIndex) pathPart = '/';

    if (comp && comp !== 'Navigate') {
        let flatRouteArray = [...prefixes, pathPart].filter(x => x && x !== '/');
        let flatRoute = flatRouteArray.join('.');
        
        if (flatRoute === '') flatRoute = 'index';
        if (flatRoute.includes('*')) flatRoute = flatRoute.replace('*', '$');
        
        let compImportPath = '';
        // Match: const SRMDataMaster = React.lazy(() => import("./pages/SRM/SRMDataMaster"));
        // Or multiline match
        const lazyRegex = new RegExp(`const\\s+${comp}\\s*=\\s*React\\.lazy\\(\\s*\\(\\)\\s*=>\\s*import\\(['"]([^'"]+)['"]\\)`, 'm');
        const impMatch = appContent.match(lazyRegex);
        
        if (impMatch) {
            compImportPath = impMatch[1]; // like "./pages/SRM/SRMDataMaster"
            // need to convert "./pages" to "../pages"
            if (compImportPath.startsWith('./')) {
                compImportPath = '.' + compImportPath;
            }
        } else {
            compImportPath = `../pages/${comp}`; // fallback
        }
        
        let filename = flatRoute.replace(/\//g, '.') + '.tsx';
        filename = filename.replace(/\.+/g, '.');
        
        const generatedPath = '/' + flatRoute.replace(/\./g, '/').replace('index', '').replace('$', '*');
        const formattedPath = generatedPath.endsWith('/') && generatedPath !== '/' ? generatedPath.slice(0, -1) : generatedPath;
        
        const fileData = `import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const Component = React.lazy(() => import('${compImportPath}'));

export const Route = createFileRoute('${formattedPath}')({
  component: () => (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Component />
    </Suspense>
  )
});
`;

        fs.writeFileSync(path.join(routesDir, filename), fileData);
    }
    
    if (!line.includes('/>') && pathPart !== '*') {
      prefixes.push(pathPart.replace(/^\//, ''));
    }
  }
}

console.log('Re-generated routes correctly this time.');
