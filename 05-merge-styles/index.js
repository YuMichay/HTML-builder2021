const fsPromises = require('fs/promises');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(projectFolder, 'bundle.css');
async function mergeStyles() {
    const stylesFiles = await fsPromises.readdir(stylesFolder);
    for (let i=0; i<stylesFiles.length; i++) {
        if (stylesFiles[i].includes('css')) {
            const textCss = await fsPromises.readFile(stylesFolder + '/' + stylesFiles[i], 'utf-8');
            fsPromises.appendFile(bundleFile, textCss);
        }
    }
}
mergeStyles();