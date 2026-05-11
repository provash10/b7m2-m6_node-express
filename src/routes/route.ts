import type { IncomingMessage, Server, ServerResponse } from "http";
import { productController } from "../controller/productController";

export const routeHandler = (req:IncomingMessage, res: ServerResponse)=>{
    
    //from server.ts
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
        productController(req,res)
    }
    else{
        // res.writeHead(404,{"content-type": "text/plain"});
        // res.end("Route not found"); //ok - http://localhost:5000/fjkhe

         res.writeHead(404,{"content-type": "application/json"});
         res.end(JSON.stringify({message:"Route Not Found"}));  // ok- http://localhost:5000/fjhjk - {"message":"Route Not Found"}
        
    }
}