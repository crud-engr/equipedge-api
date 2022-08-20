import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../interface/user.interface';
import User from '../../model/user.model';

export class UserService {
    async createUser(req: Request, res: Response) {
        try {
            let { fullName, email, phone, password } =
                req.body;
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
            // create user
            const user: IUser = await User.create({
                fullName,
                email,
                phone,
                password,
            });
            return res.status(200).json({
                status: 'success',
                message: 'New user created',
                data: { user },
                code: 200
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 'error',
                message: 'Server error',
                code: 500,
            });
        }
    }
}

