import { Request, NextFunction } from 'express';
import { ResponseWithUser } from '../types/apiTypes';

module.exports = func => {
    return (req: Request, res: ResponseWithUser, next: NextFunction) => {
        func(req, res, next).catch(next);
    }
}
