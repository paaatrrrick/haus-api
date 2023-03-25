if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const catchAsync = require('./methods/catchAsync');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { RequestInfo, RequestInit } from "node-fetch";
const fetch = (url: RequestInfo, init?: RequestInit) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import { constants } from './constants';
import { isLoggedIn } from './methods/middleware';
import users from './models/user';
import orders from './models/order';
import { randomStringToHash24Bits } from './methods/helpers';
import { ResponseWithUser } from './types/apiTypes';

export default class Api {
    private port: number;
    private dbUrl: string;
    constructor(port: number, dbUrl: string) {
        this.port = port;
        this.dbUrl = dbUrl;
    }


    baseRouter(): express.Router {
        const baseRoutes = express.Router();

        if (process.env.NODE_ENV !== "production") {
            baseRoutes.get('/wipe', async () => {
                await users.deleteMany({});
                console.log('deleted everything');
            })
        }

        baseRoutes.post('/create-order', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const { email, name, photos, magicStyle } = req.body;
            console.log('we have been hit!');
            const newOrder = new orders({ email: email, name: name, magicStyle: magicStyle, images: photos, status: 'pending' });
            await newOrder.save();
            res.status(200).send({ message: 'Order created' });
        }));

        baseRoutes.get('/', (req: Request, res: Response) => {
            console.log('yo yo yo yoa')
            res.send('Welcome to the home of Claribase, we are currently working to get up and running. For any questions please contact patrick.123.foster@gmail.com');
        });

        baseRoutes.get('/isLoggedIn', isLoggedIn, catchAsync(async (req: Request, res: ResponseWithUser, next: NextFunction) => {
            res.status(200).send({ user: res.user });
        }));

        baseRoutes.post('/google', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const { idToken, email, profilePicture, name } = req.body;
            const uid = randomStringToHash24Bits(idToken);
            const user = await users.findById(uid);
            if (!user) {
                const newUser = new users({ _id: uid, email: email, name: name, profilePicture: profilePicture })
                await newUser.save();
            }
            const token = jwt.sign({ _id: uid, }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1000d" });
            res.status(200).send({ token: token, message: 'Login successful' });
        }));



        return baseRoutes;
    }

    error(): ErrorRequestHandler {
        return (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err);
            res.status(500).send({ error: err.message });
        }
    }


    start(): void {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.dbUrl, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", () => {
            console.log("✅ We're connected to the database");
        });


        const app = express();
        app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
        app.use(cors());
        app.use(cookieParser());
        app.use(`${constants.baseApiUrl}/base`, this.baseRouter());
        app.use(this.error());


        let PORT: number | string = process.env.PORT;
        if (PORT == null || PORT == "") {
            PORT = this.port;
        }
        app.listen(PORT, () => {
            return console.log(`✅ We're live: ${PORT}`);
        });
    }

}
