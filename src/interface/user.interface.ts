import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    activationToken: string;
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role: string;
    level: number;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    regeneratePassword(password: string): Promise<string>;
    comparePassword(password: string): Promise<boolean>;
    isAuthorized(role_name: string): Promise<boolean>;
}
