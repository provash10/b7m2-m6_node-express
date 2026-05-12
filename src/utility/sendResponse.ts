import type { ServerResponse } from "http";

export const sendResponse = (
    res:ServerResponse,
    statusCode : number,
    success: boolean, 
    message:string,
    data?: any,)=>{

    const response = {
        // success: success,
        // message: message,
        // data: data,
        success,
        message,
        data,
    }

    // res.writeHead(200, { "content-type": "application/json" });
    res.writeHead(statusCode, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Product retrieved Successfully",
    //     data: products,
    //   })
    // );
    res.end(
      JSON.stringify(response));
    return;
}