import mongoose from 'mongoose';

export interface IResetPassword extends mongoose.Document {
    token: string;
    email: string;
    expiry: Date;
    isUsed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
