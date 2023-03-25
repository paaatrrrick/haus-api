import { Response } from 'express';
import { User } from '../types/models';


export interface UserWithId extends User {
    id: string;
}
export interface ResponseWithUser extends Response {
    userId?: string | null;
    user?: UserWithId;
}



export interface FirebaseConfigTypes {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}