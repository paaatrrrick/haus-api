export interface ConstantTypes {
    port: number;
    authHeader: string;
    baseApiUrl: string;
    client_id: string;
    client_secret: string;
    myEmail: string;
}

export interface EmailTemplateTypes {
    orderComplete: (name: string) => string;
    fyiReedAndPatrick: (name: string, imagesUrls: string[], magicStyle: string, posterSize: string) => string;
}