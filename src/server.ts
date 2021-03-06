import express, { Request, Response } from "express";
import http from "http";
import compression from "compression";
import helmet from "./middlewares/helmet";
import cors from "./middlewares/cors";
import logging from "./middlewares/logging"
import fs from "fs";

const app = express();

app.use(cors);
app.use(express.json());
app.use(compression());
app.use(helmet);
app.use(logging)

app.locals.logStream = fs.createWriteStream("combined.log", { flags: 'a' });

app.get("/", (req: Request, res: Response) => {
    return res.send({
        status: "online",
        host: req.headers.host,
    });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

process.on('SIGINT', function () {
    app.locals.logStream.close();
})

server.listen(PORT, () => console.log(`Server started at port ${PORT}`));

export default server;