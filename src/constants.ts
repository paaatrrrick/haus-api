import { ConstantTypes, EmailTemplateTypes } from './types/constantTypes';
import { FirebaseConfigTypes } from './types/apiTypes';


export const constants: ConstantTypes = {
    port: 4500,
    authHeader: "x-access-potter-auth-token",
    baseApiUrl: "",
    client_id: 'dd9aa4570f110091da24',
    client_secret: "fecf8ac7378fc3cdba2ec36c40a88b1ae5728be6",
    myEmail: 'patrick.123.foster@gmail.com'
};

const orderComplete = (name: string): string => {
    return `Hello ${name}, <br/> <br/> This is Patrick from Art by Haus. I'm reaching out to confirm that we have got your order and are working hard on it now. <br/> I'll reach out to you in the next day or two to see if you like the art we have created and if you have any suggestions. <br/> <br/> If you have any questions, please feel free to contact me at patrick.123.foster@gmail.com <br/> <br/> Thanks, <br/> Patrick`
}
const fyiReedAndPatrick = (name: string, imageUrls: string[], magicStyle: string, posterSize: string): string => {
    var imagesHtml = '<ul>';
    for (var i = 0; i < imageUrls.length; i++) {
        imagesHtml += `<li><img src="${imageUrls[i]}"/>${imageUrls[i]}</li>`;
    }
    imagesHtml += '</ul>'
    return `Reed and Patrick <br/> <br/> You just recieved an order from ${name}. Treat them well! They want: "${magicStyle}" size in "${posterSize}" <br/> <br/> Images: <br/> ${imagesHtml} <br/> <br/> Love, <br/>Patreick`
}

export const emailTemplate: EmailTemplateTypes = {
    orderComplete: orderComplete,
    fyiReedAndPatrick: fyiReedAndPatrick
}

export const firebaseConfig: FirebaseConfigTypes = {
    apiKey: "AIzaSyA2LgZRKfH1y2T5NAxTtWxfkZZ0tbyzKYk",
    authDomain: "potter-e7259.firebaseapp.com",
    projectId: "potter-e7259",
    storageBucket: "potter-e7259.appspot.com",
    messagingSenderId: "508656216323",
    appId: "1:508656216323:web:ecf24188be5a027517e136",
    measurementId: "G-41DSEPR2T4"
};

