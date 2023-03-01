import { Request, NextFunction } from 'express';
import { ResponseWithUserId } from '../types/apiTypes';
import jwt from 'jsonwebtoken';
import { constants } from '../constants';

//make an interface from Reponse that includes a userId property as null or a string



async function isLoggedIn(req: Request, res: ResponseWithUserId, next: NextFunction) {

    //check if req.headers
    let token: string | string[] = req.headers[constants.authHeader];
    if (Array.isArray(token)) {
        token = token[0];
    }
    //check if token exists or is null in an if statement
    if (!token || token === "" || token === undefined || token === null || token === "null") {
        return res.status(401).send(JSON.stringify("not logged in"));
    } else {
        try {
            let decoded: string = jwt.verify(token, <string>this._jwtPk);

            console.log(decoded);

            let user = this._mongo.users().findById(decoded, (err: any, user: any) => {
                if (err) {
                    res.status(500).send(JSON.stringify('Internal server error.'));
                }
            })

            if (!user) {
                return res.status(401).send(JSON.stringify("no user found"));
            }

            res.userId = decoded;
        } catch (e) {
            return res.status(500).send(JSON.stringify("internal server error"));
        }
    }
    next();
    // res.redirect('/login');
}



export { isLoggedIn };
