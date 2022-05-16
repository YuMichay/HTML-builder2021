const fsPromises = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

async function copyFiles() {
    fsPromises.mkdir(folderPath, {recursive: true});
    const files = await fsPromises.readdir(filesPath);
    for(let i = 0; i < files.length; i++){
        const srcFile = path.join(filesPath, files[i]);
        const destFile = path.join(folderPath, files[i]);
        fsPromises.copyFile(srcFile, destFile);
    }
}
copyFiles();