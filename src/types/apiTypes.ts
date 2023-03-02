import { Response } from 'express';


export interface ResponseWithUserId extends Response {
    userId?: string | null;
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