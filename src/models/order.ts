import mongoose from 'mongoose';
import { Order } from '../types/models';
const Schema = mongoose.Schema;

const OrderSchema = new Schema<Order>({
    email: { type: String, optional: false },
    name: { type: String, optional: false },
    images: { type: [String], optional: false },
    magicStyle: { type: String, optional: false },
    dateCreate: { type: Date, default: Date.now },
    dateFinished: { type: Date, optional: true },
    status: { type: String, optional: false },
});

export default mongoose.model('orders', OrderSchema);