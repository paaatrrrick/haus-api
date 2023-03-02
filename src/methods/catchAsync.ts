import { Request, NextFunction } from 'express';
import { ResponseWithUserId } from '../types/apiTypes';

module.exports = func => {
    return (req: Request, res: ResponseWithUserId, next: NextFunction) => {
        func(req, res, next).catch(next);
    }
}
