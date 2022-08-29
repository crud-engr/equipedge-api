import { Request, Response, NextFunction } from 'express';
import _, { omit } from 'lodash';
import { IRole } from '../../interface/role.interface';
import { IUser } from '../../interface/user.interface';
import log from '../../logger';
import Role from '../../model/role.model';
import User from '../../model/user.model';

export class UserService {
    async createUser(req: Request, res: Response) {
        try {
            let { fullName, email, phone, password } = req.body;
            // check if user exist
            const existEmail = await User.findOne({ email }).exec();
            if (existEmail) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email has been registered by another user',
                    code: 400,
                });
            }
            const existPhone = await User.findOne({ phone }).exec();
            if (existPhone) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Phone has been registered by another user',
                    code: 400,
                });
            }
            // select role to assign to user
            const role: IRole | null = await Role.findOne({
                name: 'user',
                level: 4,
            }).exec();
            if (!role) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Role not found',
                    code: 404,
                });
            }
            // create user
            let user: IUser = new User({
                fullName,
                email,
                phone,
                password,
                role: role.name,
                level: role.level,
            });
            await user.save();
            // remove password from response
            let newUser = _.pick(user, [
                'fullName',
                'email',
                'phone',
                'createdAt',
                'updatedAt',
            ]);
            return res.status(201).json({
                status: 'success',
                message: 'New user created',
                data: { newUser },
                code: 201,
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Server error',
                code: 500,
            });
        }
    }

    async findUsers(req: Request, res: Response) {
        try {
            // check if user exist
            const users: IUser[] = await User.find({}).exec();
            if (users.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: 'No available users',
                    code: 200,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'All available users',
                recordCount: users.length,
                data: { users },
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Server error',
                code: 500,
            });
        }
    }

    async findUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const user = await User.findOne({
                _id: userId,
            });
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    code: 404,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'User fetched successfully',
                data: { user },
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid user ID to fetch user',
                    code: 400,
                });
            }
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const user = await User.findOne({
                _id: userId,
            }).exec();
            const fieldsToUpdate = _.pick(req.body, [
                'fullName',
                'email',
                'phone',
                'role',
                'level',
            ]);
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                fieldsToUpdate,
                { new: true },
            ).exec();
            return res.status(200).json({
                status: 'success',
                message: 'User updated successully',
                data: { updatedUser },
                code: 200,
            });
        } catch (error: any) {
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid user ID to fetch user',
                    code: 400,
                });
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const user = await User.findOne({
                _id: userId,
            }).exec();
            await User.findOneAndDelete({ _id: userId }).exec();
            return res.status(204).json({
                status: 'success',
                message: 'User deleted successfully',
                data: null,
                code: 204,
            });
        } catch (error: any) {
            log.error(error.message);
            console.log(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid user ID to fetch user',
                    code: 400,
                });
            }
        }
    }
}
