import { Request, Response } from "express";

export default function logging(req: Request, res: Response, next: any) {
    if (process.env.NODE_ENV == "production") {
        
    } else {
        let t = new Date()
        console.log(`${req.ip} -- [${t.toLocaleString()}] ${req.method} ${req.url} ${res.statusCode} ${req.headers["user-agent"]}`)
    }
    next()
}