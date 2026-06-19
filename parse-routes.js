const fs = require('fs');
const path = require('path');

const appTsx = fs.readFileSync(path.join(__dirname, 'src', 'App.tsx'), 'utf8');

// Rough parsing for Routes
const routes = [];
let routeMatches = [...appTsx.matchAll(/<Route\s+(?:path=["']([^"']+)["']\s+)?(?:index\s+)?element=\{<([A-Za-z0-9_]+)[^>]*>\}([\s\S]*?)<\/Route>|<Route\s+(?:path=["']([^"']+)["']\s+)?(?:index\s+)?element=\{<([A-Za-z0-9_]+)[^>]*>\}\s*\/>/g)];

// To handle nested correctly, we can extract from string using a stack for <Route
// Or we can just read the file line by line for paths and components.
