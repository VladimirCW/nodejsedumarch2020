const fs = require('fs');

const content = fs.readFileSync('./input.txt');
//console.log(content.toString());

fs.readFile('./input.txt', function(err, data) {
    if(err) {
        console.log(err);
    }
    //console.log(data.toString());
});

//fs.writeFileSync('./out.txt', "Hello content");
//fs.appendFileSync('./out.txt', "Another content");

const dir = fs.readdirSync(__dirname);
dir.forEach(i => {
    const isDir = fs.lstatSync(__dirname + "\\" + i).isDirectory();
    console.log(`Item: ${i}: ${isDir}`);
});
