if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import multer from 'multer';


export default class Api {
    private port: number;
    constructor(port: number) {
        this.port = port;
    }


    router(): express.Router {
        const router = express.Router();
        router.get('/', (req: Request, res: Response) => {
            console.log('hello world');
            res.send('Hello World!');
        });
        return router;
    }


    start(): void {
        console.log('starting server');
        const app = express();
        app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
        app.use(cors());
        app.use(cookieParser());
        app.use(this.router());


        let PORT: number | string = process.env.PORT;
        if (PORT == null || PORT == "") {
            console.log('port is null');
            PORT = this.port;
        }
        app.listen(PORT, () => {
            return console.log(`✅ We're live: ${PORT}`);
        });
    }

}
