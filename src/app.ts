if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const catchAsync = require('./methods/catchAsync');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import { constants } from './constants';
import { isLoggedIn } from './methods/middleware';
import users from './models/user';
import { randomStringToHash24Bits } from './methods/helpers';


export default class Api {
    private port: number;
    private dbUrl: string;
    constructor(port: number, dbUrl: string) {
        this.port = port;
        this.dbUrl = dbUrl;
    }


    userRoutes(): express.Router {
        const userRouter = express.Router();
        userRouter.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the home of Claribase, we are currently working to get up and running. For any questions please contact patrick.123.foster@gmail.com');
        });
        return userRouter;
    }

    authRoutes(): express.Router {
        const authRouter = express.Router();
        authRouter.get('/isLoggedIn', isLoggedIn, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({ message: 'user authenticated' });
        }));

        authRouter.post('/google', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
        return authRouter;
    }

    githubRoutes(): express.Router {
        const githubRouter = express.Router();
        githubRouter.post('/callback', (req: Request, res: Response) => {
            console.log('we are at the callback funciton');
            console.log(req.body);
            res.status(200).send({})

        });
        githubRouter.post('/webhook', (req: Request, res: Response) => {
            console.log('we are at the webhook function');
            console.log(req.body);
            res.status(200).send({})

        });
        return githubRouter
    }

    error(): ErrorRequestHandler {
        return (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log('we are in the error function');
            console.log(err);
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
        app.use(`${constants.baseApiUrl}/user`, this.userRoutes());
        app.use(`${constants.baseApiUrl}/auth`, this.authRoutes());
        app.use(`${constants.baseApiUrl}/github`, this.githubRoutes());
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
