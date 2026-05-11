import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server = createServer((req:IncomingMessage, res: ServerResponse)=>{
    console.log(req);
    // console.log(req.url);  // '/', '/user', '/products'
    // console.log(req.method);  // "GET", "POST", "DELETE"

    const url = req.url
    const method = req.method

    if(url === "/" && method === "GET"){
        // console.log("This is Root route");

        // res.writeHead(200,{"content-type": "text/plain"});
        // res.end("This is root route"); // ok -http://localhost:5000/

         res.writeHead(200,{"content-type": "application/json"});
         res.end(JSON.stringify({message:"This is root route"}));  // ok -http://localhost:5000/ {"message":"This is root route"}
    }

    else if (url?.startsWith("/products")){
        res.writeHead(200,{"content-type": "application/json"});
         res.end(JSON.stringify({message:"This is Product Route"})); 
    }
    else{
        // res.writeHead(404,{"content-type": "text/plain"});
        // res.end("Route not found"); //ok - http://localhost:5000/fjkhe

         res.writeHead(404,{"content-type": "application/json"});
         res.end(JSON.stringify({message:"Route Not Found"}));  // ok- http://localhost:5000/fjhjk - {"message":"Route Not Found"}
        
    }

    //check nodejs doc- https://nodejs.org/docs/latest/api/http.html -->http-- Server  Response
    // response.writeHead(statusCode[, statusMessage][, headers])
    // https://nodejs.org/docs/latest/api/http.html#class-httpserverresponse

});


server.listen(5000,()=>{
    console.log("Server is running on the port 5000");
    
})
