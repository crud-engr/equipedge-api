import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role: string;
    level: number;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
