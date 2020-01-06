const fs = require("fs");
const http = require("http");
const url = require("url");

///////////////// FILES

// Blocking , synchronous way


// const inputFile = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(inputFile);
// const outPut = `this is what we know about avocado: ${inputFile} \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", outPut);



// Non-blocking , asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8' ,(error, data1) => {
//     if(error) return console.log("ERROR");

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
//         console.log(data2);

//         fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2} \n${data3}`, 'utf-8', error => {
//                 console.log("your data has been written 🥑");
//             });
//         });
//     });
// });

// console.log("will read first");


///////////////// HTTP
// basic routing

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((request, response) => {
    const pathName = request.url;


    if(pathName === "/" || pathName === "/overview"){
        response.end("This is the overview");

    } else if(pathName === "/product"){
        response.end("This is the product");
    } 
     else if(pathName === "/api"){

        response.writeHead(200, {
            'Content-type': 'application/json'
        });
        response.end(data);

        // fs.readFile("./dev-data/data.json"); bad way
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (error, data) => {
        //     const productData = JSON.parse(data);
        //     // console.log(productData);
        //     response.writeHead(200, {
        //         'Content-type': 'application/json'
        //     });
        //     response.end(data);

        // });
    } else {
        // response.writeHead(404); send 404 status error
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello header'
        });
        // response.end("page not found!");
        response.end("<h1>page not found!</h1>");
    }
});

server.listen(8000, "127.0.0.1", ()=> {
    console.log("listening for request on port 8000");
});
