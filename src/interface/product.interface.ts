import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
    name: string;
    image: string;
    price: number;
    quantityStock: number;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
