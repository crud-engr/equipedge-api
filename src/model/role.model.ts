import mongoose from 'mongoose';
import { IRole } from '../interface/role.interface';

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const Role = mongoose.model<IRole>('Role', RoleSchema);

export default Role;
