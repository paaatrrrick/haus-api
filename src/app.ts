if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { constants } from './constants';
import users from './models/user';


export default class Api {
    private port: number;
    constructor(port: number) {
        this.port = port;
    }


    userRoutes(): express.Router {
        const userRouter = express.Router();
        userRouter.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the home of Claribase, we are currently working to get up and running. For any questions please contact patrick.123.foster@gmail.com');
        });
        return userRouter;
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


    start(): void {
        const app = express();
        app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
        app.use(cors());
        app.use(cookieParser());
        app.use(`${constants.baseApiUrl}/user`, this.userRoutes());
        app.use(`${constants.baseApiUrl}/github`, this.githubRoutes());



        let PORT: number | string = process.env.PORT;
        if (PORT == null || PORT == "") {
            PORT = this.port;
        }
        app.listen(PORT, () => {
            return console.log(`✅ We're live: ${PORT}`);
        });
    }

}
