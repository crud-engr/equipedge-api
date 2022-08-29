import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import config from 'config';
import moment from 'moment';
import crypto from 'crypto';

import { IUser } from '../interface/user.interface';
import Role from './role.model';
import { IRole } from '../interface/role.interface';

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
            select: false,
        },
        role: {
            type: String,
            default: 'user',
        },
        level: {
            type: Number,
            default: 4,
        },
        activationToken: {
            type: String,
        },
        notificationCounter: {
            type: Number,
            default: 0,
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

UserSchema.pre<IUser>('save', function (next) {
    this.activationToken = crypto
        .createHash('sha256')
        .update(this.activationToken)
        .digest('hex');
    next();
});

UserSchema.methods.regeneratePassword = async function (password: string) {
    this.password = password;
    await this.save();
};

UserSchema.methods.comparePassword = async function (password: string) {
    const user: any = this;
    return await bcrypt.compare(password, user.password);
};

UserSchema.methods.isAuthorized = async function (role_name: string) {
    const user = this as IUser;
    return role_name === user.role ? true : false;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
