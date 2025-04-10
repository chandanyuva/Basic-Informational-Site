let http = require("node:http");
let fs = require("node:fs");
let url = require("node:url");

const renderHTML = (FileName,res)=>[
    fs.readFile(FileName,(err,data)=>{
        if(err){
            console.log(err);
            res.writeHead(404,{"Content-Type":"text/html"});
            res.write("Error Reading source files");
            return res.end();
        }else{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(data);
            return res.end();
        }
    })
]

const server = http.createServer((req,res)=>{
    let path = url.parse(req.url,true).pathname;
    console.log(path);
    switch (path) {
        case "/":
            renderHTML("./html files/index.html",res);
            break;
        case "/about":
            renderHTML("./html files/about.html",res);
            break;
        case "/contact-me":
            renderHTML("./html files/contact-me.html",res);
            break;
        default:
            console.log(path,"not found");
            const page404=fs.readFileSync("./html files/404.html", (err, data) => {
                if (err) throw err;
                return data;
              });
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(page404);
            res.end();
    }
});

server.listen(8080);

