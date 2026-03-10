const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const files = [
    'src/components/sections/HeroSection.jsx',
    'src/components/sections/ProjectsSection.jsx',
    'src/components/ui/CustomCursor.jsx',
    'src/context/ThemeContext.jsx',
    'src/components/ui/Marquee.jsx'
];

for (const file of files) {
    const fullPath = path.join('c:\\Users\\Satyajit Samal\\OneDrive\\Desktop\\go\\Top_Projects\\portfolio', file);
    const code = fs.readFileSync(fullPath, 'utf8');
    try {
        babel.parse(code, {
            filename: file,
            presets: ['@babel/preset-react']
        });
        console.log(`✅ ${file} OK`);
    } catch (err) {
        console.error(`❌ Syntax Error in ${file}:`);
        console.error(err.message);
    }
}
