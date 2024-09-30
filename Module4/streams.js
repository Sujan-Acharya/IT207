const fs = require('fs');

let src = "./myText.txt";
let dest = "./copyText1.txt";


//Define a readable stream on the file 'myText.txt'
const rStream = fs.createReadStream(src);

//Define a writable stream on the file 'copyText1.txt'
const wStream = fs.createWriteStream(dest);

//fill in the missing event name, callback parameter and writable stream method
rStream.on('data',(chunk)=>{
    wStream.write(chunk);
});

rStream.on("end", ()=>{ //fill in the missing event name, and writable stream method
    console.log('Finished reading the file.');
    wStream.end();
});

//Fill in the required parameters to define an error event on the readable stream
rStream.on('error', (err)=>{
    console.log('Error = '+err);
    console.log("Message = "+err.message);
    throw err;
});
