import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = async(req:IncomingMessage, res:ServerResponse)=>{

    const url = req.url
    const method = req.method

    //products => /products/1 => ['', 'products', '1']
    const urlParts = url?.split('/');
    // console.log(urlParts);

    const id =urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;
    // console.log("This is the actual id : ", id)

    //Get All Products
    if(url === "/products" && method === "GET"){
        // const products =[
        //     {
        //         id: 1,
        //         name: "Product - 1",
        //     }
        // ]
        // readProduct();

        const products = readProduct();

        
        res.writeHead(200,{"content-type": "application/json"});
        res.end(JSON.stringify({message:"Products retrived Successfully", 
            data: products,
        })); 
    }
    
        else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        if (!product) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found", data: null }));
            return;
        }
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product retrieved Successfully", data: product }));
        return;
    }
    // Fallback for unknown routes
    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
};