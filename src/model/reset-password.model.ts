import mongoose from 'mongoose';
import moment from 'moment';
import crypto from 'crypto';

import { IResetPassword } from '../interface/reset-password.interface';

const ResetPasswordSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        expiry: {
            type: Date,
        },
        isUsed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const ResetPassword = mongoose.model<IResetPassword>(
    'ResetPassword',
    ResetPasswordSchema,
);

export default ResetPassword;
