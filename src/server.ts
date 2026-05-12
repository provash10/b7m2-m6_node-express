import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server : Server = createServer((req:IncomingMessage, res: ServerResponse)=>{
    console.log(req);
    // console.log(req.url);  // '/', '/user', '/products'
    // console.log(req.method);  // "GET", "POST", "DELETE"

    routeHandler(req,res)

    //check nodejs doc- https://nodejs.org/docs/latest/api/http.html -->http-- Server  Response
    // response.writeHead(statusCode[, statusMessage][, headers])
    // https://nodejs.org/docs/latest/api/http.html#class-httpserverresponse

});

server.listen(config.port,()=>{
    console.log(`The Server is running on the port ${config.port}`);
    
})

// server.listen(5000,()=>{
//     console.log("Server is running on the port 5000");
    
// })
