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

interface fileNameAndId {
    name: string,
    id: string,
}

export interface fileDictionary {
    [filePath: string]: fileNameAndId;
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
