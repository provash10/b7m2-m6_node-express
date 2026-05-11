import fs from "fs";
import path from "path";

const filepath = path.join(process.cwd(),'./src/database/db.json')

export const readProduct = ()=>{
    // console.log(process.cwd());
    // console.log(filepath);

    const products = fs.readFileSync(filepath, "utf-8");   //fs.readFileSync(path[, options]) //https://nodejs.org/docs/latest/api/fs.html#fsreadfilesyncpath-options

    // console.log(products.toString())  // ok terminal data showing
    // console.log(products);
    // return products;
    console.log(JSON.parse(products))
    return JSON.parse(products);
}