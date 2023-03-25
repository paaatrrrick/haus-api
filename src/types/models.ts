export interface User {
    email: string,
    dateCreate: Date,
    name: string,
}


export interface Order {
    name: string,
    email: string,
    images: string[],
    magicStyle: string,
    dateCreate: Date,
    dateFinished: Date | null,
    status: string,
}

