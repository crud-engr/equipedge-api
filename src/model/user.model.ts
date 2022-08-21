import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import config from 'config';

import { IUser } from '../interface/user.interface';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

UserSchema.pre<IUser>('save', async function (next: any) {
    // hash password if new or modified
    if (!this.isModified('password')) return next();

    // generate salt
    const salt: string = await bcrypt.genSalt(
        parseInt(config.get('password_salt')),
    );

    // create hash
    const hash: string = await bcrypt.hash(this.password, salt);

    // replace plain password with hash
    this.password = hash;

    return next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
) {
    const user = this as IUser;
    return await bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
