import mongoose from 'mongoose';
import { User, usersRepos } from '../types/models';
const Schema = mongoose.Schema;

const usersReposSchema = new Schema<usersRepos>({
    name: { type: String, required: true },
    id: { type: String, required: true }
});

const UserSchema = new Schema<User>({
    email: { type: String, optional: false },
    dateCreate: { type: Date, default: Date.now },
    name: { type: String, optional: false },
    profilePicture: { type: String, optional: false },
    repositories: { type: [usersReposSchema], default: [] },
    accessToken: { type: String, optional: true },
    githubId: { type: String, optional: true },
});

export default mongoose.model('users', UserSchema);