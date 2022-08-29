import { Response, Request } from 'express';
import log from '../../logger';
import { UserService } from '../../service/admin/user-mgt.service';

export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            return new UserService().createUser(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                err: error.message,
                code: 500,
            });
        }
    }

    async findUsers(req: Request, res: Response) {
        try {
            return new UserService().findUsers(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                err: error.message,
                code: 500,
            });
        }
    }

    async findUser(req: Request, res: Response) {
        try {
            return new UserService().findUser(req, res);
        } catch (error: any) {
           log.error(error.message);
           return res.status(500).json({
               status: 'error',
               message: 'Error occured',
               err: error.message,
               code: 500,
           });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            return new UserService().updateUser(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                err: error.message,
                code: 500,
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            return new UserService().deleteUser(req, res);
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: 'error',
                message: 'Error occured',
                err: error.message,
                code: 500,
            });
        }
    }
}

