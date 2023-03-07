import mongoose from 'mongoose';
import { Repo } from '../types/models';
const Schema = mongoose.Schema;


const RepoSchema = new Schema<Repo>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    files: {
        type: Map,
        of: {
            name: { type: String, required: true },
            path: { type: String, required: true },
            type: { type: String, required: true },
        },
        default: {},
    }
});

export default mongoose.model('repos', RepoSchema);