const fs = require("fs");

// Blocking , synchronous way


// const inputFile = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(inputFile);
// const outPut = `this is what we know about avocado: ${inputFile} \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", outPut);



// Non-blocking , asynchronous way

fs.readFile('./txt/start.txt', 'utf-8' ,(error, data1) => {
    if(error) return console.log("ERROR");

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
        console.log(data2);

        fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2} \n${data3}`, 'utf-8', error => {
                console.log("your data has been written 🥑");
            });
        });
    });
});

console.log("will read first");
