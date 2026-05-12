import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // console.log("Request",req);  //for parseBody.ts

  const url = req.url;
  const method = req.method;

  //products => /products/1 => ['', 'products', '1']
  const urlParts = url?.split("/");
  // console.log(urlParts);

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log("This is the actual id : ", id)

  //Get All Products
  if (url === "/products" && method === "GET") {
    // const products =[
    //     {
    //         id: 1,
    //         name: "Product - 1",
    //     }
    // ]
    // readProduct();

    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrived Successfully",
        data: products,
      })
    );
  }

  //GET Method
  else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    
    if (!product) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found", data: null }));
      return;
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved Successfully",
        data: product,
      })
    );
    return;
  }

  //POST Method
  else if (method === "POST" && url === "/products") {
    // const body = "";
    const body = await parseBody(req);
    //  console.log("Body", body);

    const products = readProduct(); // read kora lagbe
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct);

    products.push(newProduct); // [{},{},{},{new}]
    // console.log(products);
    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created Successfully",
        data: products,
      })
    );
    return;
  }

  //PUT Method
  else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        })
      );
      return;
    }
    // console.log( products[index]);
    products[index] = { id: products[index].id, ...body };

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Updated Successfully",
        data: products[index],
      })
    );
    return;
  }

  //Delete Method
  else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        })
      );
      return;
    }

    //example of splice
    // const arr = ["1", "2", "3", "4"];  //3 k bad dibo, akta k bad dibo jonno 1
    // arr.splice(2,1);
    // console.log(arr);

    products.splice(index,1)
    // console.log(products);
    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Deleted Successful",
          data: null,
        })
      );
      return;

  }

  // Fallback for unknown routes //ai
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};
