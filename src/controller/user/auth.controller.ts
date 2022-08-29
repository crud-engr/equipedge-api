import { Request, Response } from 'express';
import log from '../../logger';
import { AuthService } from '../../service/user/auth.service';

export class AuthController {
    async signup(req: Request, res: Response) {
        try {
            return new AuthService().signup(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                code: 500,
            });
        }
    }

    async activateAccount(req: Request, res: Response) {
        try {
            return new AuthService().activateAccount(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                code: 500,
            });
        }
    }

    async signin(req: Request, res: Response) {
        try {
            return new AuthService().signin(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                code: 500,
            });
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            return new AuthService().forgotPassword(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                code: 500,
            });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            return new AuthService().resetPassword(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                code: 500,
            });
        }
    }

    async resendToken(req: Request, res: Response) {
        try {
            return new AuthService().resendToken(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                code: 500,
            });
        }
    }
}
