import * as express from "express";

export default (req: any, res: any, next: any) => {
    console.log(req.baseUrl);
    next();
};
