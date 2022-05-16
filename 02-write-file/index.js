const fs = require('fs');
const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let writeableStream = fs.createWriteStream('./02-write-file/consoleText.txt');
console.log('Helloooooo!');
function writeFile() {
    rl.question('Enter something, please: \n', (answer) => {
        if (answer !== 'exit') {
            writeableStream.write(answer + '\n');
            writeFile();
        } else if (answer == 'exit') {
            console.log('Byeeeee!');
            process.exit();
        }
        rl.on('SIGINT', function () {
            console.log('Otaaaaay, Bye!');  
            process.exit();
        });  
    });
}
writeFile();