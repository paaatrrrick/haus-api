import mongoose from 'mongoose';
import { Repo } from '../types/models';
const Schema = mongoose.Schema;


const RepoSchema = new Schema<Repo>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    files: {
        type: Map,
        of: String,
        default: {},
    }
});

export default mongoose.model('repos', RepoSchema);