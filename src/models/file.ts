import mongoose from 'mongoose';
import { File } from '../types/models';
const Schema = mongoose.Schema;


const FileSchema = new Schema<File>({
    repoId: { type: String, required: true },
    summary: { type: String, required: false },
    name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    contentUrl: { type: String, required: true },
    children: { type: [String], required: false },
});



export default mongoose.model('files', FileSchema);