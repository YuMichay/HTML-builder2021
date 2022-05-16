const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');
fs.readdir(filePath, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach(file => {
        if (file.isFile() === true){
            fs.stat((filePath + '/' + file.name), (err, stats) => {
                if (err) {
                    throw err;
                }
                console.log(path.parse(file.name).name + ' ' + '-' + ' ' + path.extname(file.name) + ' ' + '-' + ' ' + stats.size/1000 + 'kb');
            });
        }
    })
});