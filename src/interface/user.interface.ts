import mongoose from 'mongoose';
// import { IRole } from './role.interface';

export interface IUser extends mongoose.Document {
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role: string;
    // role: IRole['_id'];
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
