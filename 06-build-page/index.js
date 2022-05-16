const fsPromises = require('fs/promises');
const path = require('path');
const templatePath = path.join(__dirname, 'template.html');
const projectPath = path.join(__dirname, 'project-dist');
const htmlPath = path.join(projectPath, 'index.html');
const componentsPath = path.join(__dirname, 'components');

async function buildPage() {
    //create main folder
    fsPromises.mkdir(projectPath, {recursive: true});
    //create html file
    const dataTemplate = await fsPromises.readFile(templatePath, 'utf-8');
    await fsPromises.writeFile(htmlPath, dataTemplate);
    const str = await fsPromises.readFile(htmlPath, 'utf-8');

    const reHeader = /{{header}}/g;
    const newHeader = await fsPromises.readFile((path.join(componentsPath, 'header.html')), 'utf-8');

    const reArticles = /{{articles}}/g;
    const newArticles = await fsPromises.readFile((path.join(componentsPath, 'articles.html')), 'utf-8');

    const reFooter = /{{footer}}/g;
    const newFooter = await fsPromises.readFile((path.join(componentsPath, 'footer.html')), 'utf-8');

    let newHtml = str.replace(reHeader, newHeader).replace(reArticles, newArticles).replace(reFooter, newFooter);
    await fsPromises.writeFile(htmlPath, newHtml);
    
    //create styles
    const stylesPath = path.join(__dirname, 'styles');
    const stylesFiles = await fsPromises.readdir(stylesPath);
    const newStylesFile = path.join(projectPath, 'style.css');
    for (let i=0; i<stylesFiles.length; i++) {
        const textStyles = await fsPromises.readFile((stylesPath + '/' + stylesFiles[i]), 'utf-8');
        fsPromises.appendFile(newStylesFile, textStyles);
    }
    //add assets
    const assetsFolder = path.join(__dirname, 'assets');
    const newAssetsFolder = path.join(projectPath, 'assets');
    fsPromises.mkdir(newAssetsFolder, {recursive: true});
    
    const fontsFolder = path.join(assetsFolder, 'fonts');
    const fontsFiles = await fsPromises.readdir(fontsFolder);
    const newFonts = path.join(newAssetsFolder, 'fonts');
    fsPromises.mkdir(newFonts, {recursive: true});
    for(let i = 0; i < fontsFiles.length; i++){
        const srcFile = path.join(fontsFolder, fontsFiles[i]);
        const destFile = path.join(newFonts, fontsFiles[i]);
        fsPromises.copyFile(srcFile, destFile);
    }

    const imgFolder = path.join(assetsFolder, 'img');
    const imgFiles = await fsPromises.readdir(imgFolder);
    const newImg = path.join(newAssetsFolder, 'img');
    fsPromises.mkdir(newImg, {recursive: true});
    for(let i = 0; i < imgFiles.length; i++){
        const srcFile = path.join(imgFolder, imgFiles[i]);
        const destFile = path.join(newImg, imgFiles[i]);
        fsPromises.copyFile(srcFile, destFile);
    }
    
    const svgFolder = path.join(assetsFolder, 'svg');
    const svgFiles = await fsPromises.readdir(svgFolder);
    const newSvg = path.join(newAssetsFolder, 'svg');
    fsPromises.mkdir(newSvg, {recursive: true});
    for(let i = 0; i < svgFiles.length; i++){
        const srcFile = path.join(svgFolder, svgFiles[i]);
        const destFile = path.join(newSvg, svgFiles[i]);
        fsPromises.copyFile(srcFile, destFile);
    }
}
buildPage();