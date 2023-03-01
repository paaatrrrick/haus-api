import { Response } from 'express';


export interface ResponseWithUserId extends Response {
    userId?: string | null;
}