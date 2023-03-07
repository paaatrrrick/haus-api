export interface usersRepos {
    name: string,
    id: string,
}

export interface User {
    email: string,
    dateCreate: Date,
    name: string,
    profilePicture: string,
    githubId: string,
    accessToken?: string,
    repositories?: usersRepos[],
}


export interface fileDictionary {
    [filePath: string]: {
        name: string;
        path: string;
        type: string;
    };
}

export interface Repo {
    userId: string,
    name: string,
    files: fileDictionary,
}


export interface File {
    name: string,
    summary: string,
    path: string,
    repoId: string,
    type: string,
    contentUrl: string,
    children: string[]
}
