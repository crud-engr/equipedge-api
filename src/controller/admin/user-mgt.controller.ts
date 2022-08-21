import { Response, Request } from 'express';
import { UserService } from '../../service/admin/user-mgt.service';

export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            return new UserService().createUser(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async findUsers(req: Request, res: Response) {
        try {
            return new UserService().findUsers(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async findUser(req: Request, res: Response) {
        try {
            return new UserService().findUser(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            return new UserService().updateUser(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            return new UserService().deleteUser(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }
}

