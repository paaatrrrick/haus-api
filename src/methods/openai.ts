
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import { Configuration, OpenAIApi } from "openai";
import { fileDictionary } from "../types/models";
import { unsupportedFileTypes } from "../constants";
import repos from '../models/repo';
import files from '../models/file';
const fetch = (url: RequestInfo, init?: RequestInit) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));


const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);


interface fileFromGithub {
    name: string;
    path: string;
    download_url: string | null;
    type: string;
    url: string;
    [key: string]: any;

}



export async function createSummariesForRepo(repoId: string, userGitHub: string, repoName: string): Promise<fileDictionary> {
    const responseRepoInfo = await fetch('https://api.github.com/repos/' + userGitHub + "/" + repoName + "/contents");
    const dataRepoInfo = await responseRepoInfo.json();
    const globalVariableFiles: fileDictionary = {};
    const recursiveFileSearch = async (fileData: fileFromGithub[]): Promise<string[]> => {
        const ids: string[] = []
        for (let file of fileData) {
            //check if the first letter is a dot or if the file is node_modules
            if (file.name !== "node_modules" && file.name.slice(0, 1) !== "." && (file.type === 'dir' || !unsupportedFileTypes.has(file.name.split('.').pop().toLowerCase() as string))) {
                if (file.type === 'dir') {
                    const response = await fetch(file.url);
                    const fileData: fileFromGithub[] = await response.json();
                    const childrenArray: string[] = await recursiveFileSearch(fileData);
                    const newFile = new files({ name: file.name, path: file.path, repoId: repoId, type: file.type, contentUrl: file.url, children: childrenArray, summary: "directory" });
                    await newFile.save();
                    ids.push(newFile.id);
                    globalVariableFiles[`${newFile.id}`] = { name: file.name, path: file.path, type: file.type };
                    // globalVariableFiles.push({ name: file.name, id: newFile.id });
                } else if (file.type === 'file') {
                    const response = await fetch(file.download_url);
                    const fileText: string = await response.text();
                    const summary: string = await handleOpenAIAPICall(fileText);
                    const newFile = new files({ name: file.name, path: file.path, repoId: repoId, type: file.type, contentUrl: file.download_url, summary: summary });
                    await newFile.save();
                    ids.push(newFile.id);
                    globalVariableFiles[`${newFile.id}`] = { name: file.name, path: file.path, type: file.type };
                }
            }
        }
        return ids;
    }
    await recursiveFileSearch(dataRepoInfo);

    await repos.findByIdAndUpdate(repoId, { $set: { files: globalVariableFiles } });

    return globalVariableFiles;
}



async function handleOpenAIAPICall(fileText: string): Promise<string> {
    if (process.env.TESTING === "true") {
        return "This is a test summary of the file: " + fileText;
    } else {
        // try {
        //     const completion = await openai.createCompletion({
        //         model: "text-davinci-003",
        //         prompt: 'give me a summary of this file: ' + fileText,
        //         temperature: 0.6,
        //         max_tokens: 100,
        //     });
        //     const ouput: string = completion.data.choices[0].text!;
        //     return ouput;
        // } catch (error) {
        //     console.log(error);
        // }
        return "ddddd";
    }
}