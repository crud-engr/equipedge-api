import { Request, Response } from 'express';
import config from 'config';
import crypto from 'crypto';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import log from '../../logger';
import User from '../../model/user.model';
import { IUser } from '../../interface/user.interface';
import Role from '../../model/role.model';
import { IRole } from '../../interface/role.interface';
import ResetPassword from '../../model/reset-password.model';

// JsonWebTokenError;
export class AuthService {
    private JWT_SECRET: string = config.get('jwt_secret');
    private JWT_EXPIRES_IN: string = config.get('jwt_expires_in');

    async generateJWT(id: string) {
        return await jwt.sign({ id }, this.JWT_SECRET, {
            expiresIn: this.JWT_EXPIRES_IN,
        });
    }

    async generateActivationToken() {
        return `${Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)}`;
    }

    async signup(req: Request, res: Response) {
        try {
            const { fullName, email, phone, password, confirmPassword } =
                req.body;
            const existUserEmail = await User.findOne({ email }).exec();
            if (existUserEmail) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email already exists',
                    code: 400,
                });
            }
            const existUserPhone = await User.findOne({ phone }).exec();
            if (existUserPhone) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Phone already exists',
                    code: 400,
                });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: 'error',
                    message: 'passwords not the same',
                    code: 400,
                });
            }
            // generate token
            const activation_token = await this.generateActivationToken();
            console.log('activation token::::: ', activation_token);
            const role: IRole | null = await Role.findOne({
                name: 'user',
            }).exec();
            if (!role) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Role not found',
                    code: 404,
                });
            }
            const user: IUser = new User({
                fullName,
                email,
                phone,
                password,
                confirmPassword,
                role: role.name,
                level: role.level,
                activationToken: activation_token,
            });
            await user.save();
            // send welcome email here::::::::::::::::::::::::::::::::::
            // send activation token email here:::::::::::::::::::::::::

            const accessToken = await this.generateJWT(user._id);
            return res.status(201).json({
                status: 'success',
                message: 'Signup successful',
                data: { user, accessToken },
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

    async activateAccount(req: Request, res: Response) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Token is required.',
                    code: 400,
                });
            }
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            const user = await User.findOne({
                activationToken: hashedToken,
                isVerified: false,
            }).exec();
            if (!user || user === null) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Unable to verify account',
                    code: 400,
                });
            }
            let currentTime = moment(Date.now());
            let sentTime = moment(user.createdAt);
            // convert to milliseconds
            let duration = moment.duration(currentTime.diff(sentTime));
            // convert to minutes
            let minutes = duration.asMinutes();

            // check if token still valid
            if (minutes > 60) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Token expired. Please resend token!',
                    code: 400,
                });
            }
            // update user status and set isVerified to true
            const activatedUser = await User.findOneAndUpdate(
                {
                    activationToken: hashedToken,
                    isVerified: false,
                },
                {
                    activationToken: hashedToken,
                    isVerified: true,
                },
                { setDefaultsOnInsert: true, upsert: true, new: true },
            );

            // send activate successful email here:::::::::::::::::::::::

            return res.status(200).json({
                status: 'success',
                message: 'account activation successful',
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

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is required',
                    code: 400,
                });
            }
            if (!password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Password is required',
                    code: 400,
                });
            }
            const user = await User.findOne({ email })
                .select('+password')
                .exec();
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid email',
                    code: 400,
                });
            }
            // compare password
            if (!(await user.comparePassword(password))) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid password',
                    code: 400,
                });
            }
            if (!user.isVerified) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Account is not verified!',
                    code: 400,
                });
            }
            // check if role is actually user
            if (!(await user.isAuthorized('user'))) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User is not permitted to use this service!',
                    code: 400,
                });
            }
            // log the user in and send token
            const token = await this.generateJWT(user._id);

            // send login email here::::::::::::::::::::::::::::::::::::::::::::::::::

            return res.status(200).json({
                status: 'success',
                message: 'signin successful',
                token,
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

    // store the user email in the state and send to backend for this endpoint
    async resendToken(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'record not found',
                    code: 400,
                });
            }
            const user = await User.findOne({
                email,
                isVerified: false,
            }).exec();
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'user record not found',
                    code: 404,
                });
            }
            const token: string = await this.generateActivationToken();
            console.log('RESENT TOKEN::::: ', token);
            const hashToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            await User.findOneAndUpdate(
                { email, isVerified: false },
                { activationToken: hashToken },
                { new: true },
            ).exec();
            // send resend token email here:::::::::

            return res.status(200).json({
                status: 'success',
                message: 'Token resent successfully. Please check your email',
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            return res
                .status(500)
                .json({ status: 'error', message: 'Server error', code: 500 });
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is required!',
                    code: 400,
                });
            }
            const user = await User.findOne({ email }).exec();
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    code: 404,
                });
            }
            const token = await this.generateActivationToken();
            console.log('forgot password token::::: ', token);
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            const expiry = moment().add(5, 'minutes');

            await ResetPassword.findOneAndUpdate(
                { email },
                { email, token: hashedToken, expiry, isUsed: false },
                { new: true, upsert: true },
            ).exec();

            // send raw token to user email to reset password:::::::::::::

            return res.status(200).json({
                status: 'success',
                message: 'Token sent to email',
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            return res
                .status(500)
                .json({ status: 'error', message: 'Server error', code: 500 });
        }
    }

    // email and token will be sent from frontend to hit this endpoint
    async resetPassword(req: Request, res: Response) {
        try {
            const { email, token, password, confirmPassword } = req.body;
            if (!email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is required!',
                    code: 400,
                });
            }
            if (!token) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Token is required!',
                    code: 400,
                });
            }
            if (!password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'password is required!',
                    code: 400,
                });
            }
            if (!confirmPassword) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Confirm password is required!',
                    code: 400,
                });
            }
            const user = await User.findOne({ email }).exec();
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User email not found!',
                    code: 404,
                });
            }
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            // check if token is found and not used
            const foundToken = await ResetPassword.findOne({
                token: hashedToken,
                isUsed: false,
            }).exec();
            if (!foundToken) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Bad token. Please try again!',
                    code: 404,
                });
            }
            // check if token has not expired
            const currentTime = moment(Date.now());
            const sentTime = moment(foundToken.updatedAt);
            const duration = moment.duration(currentTime.diff(sentTime)); //miliseconds
            const minutes = duration.asMinutes(); //minutes
            if (minutes > 60) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Token has expired. Please try again!',
                    code: 400,
                });
            }
            // check password match?
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Passwords do not match!',
                    code: 400,
                });
            }
            // reset password
            await user.regeneratePassword(password);
            // set reset password to used
            await ResetPassword.findOneAndUpdate(
                { email },
                { email, isUsed: true },
            ).exec();
            return res.status(200).json({
                status: 'success',
                message: 'Password successfully reset',
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            return res
                .status(500)
                .json({ status: 'error', message: 'Server error', code: 500 });
        }
    }
}
