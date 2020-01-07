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

const replaceTemplate = (template, object) => {

    let output = template.replace(/{%PRODUCTNAME%}/g, object.productName);
    output = output.replace(/{%IMAGE%}/g, object.image);
    output = output.replace(/{%PRICE%}/g, object.price);
    output = output.replace(/{%FROM%}/g, object.from);
    output = output.replace(/{%NUTRIENTS%}/g, object.nutrients);
    output = output.replace(/{%QUANTITY%}/g, object.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, object.description);
    output = output.replace(/{%ID%}/g, object.id);

    if(!object.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

    return output;
};

// load all view once the application starts in memorey
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProducts = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data); // array of objects

const server = http.createServer((request, response) => {
    const pathName = request.url;

    // overview page
    if(pathName === "/" || pathName === "/overview"){
        response.writeHead(200, {'Content-type': 'text/html'});


        // replace placeholders in html
        const cardsHtml = dataObject.map(object => {
            return replaceTemplate(tempCard, object);
        }).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        response.end(output);

    // Product page
    } else if(pathName === "/product"){
        response.end("This is the product");
    } 

    // API page
    else if(pathName === "/api"){

        response.writeHead(200, {
            'Content-type': 'application/json'
        });
        response.end(data);


    // Not found
    } else {
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
