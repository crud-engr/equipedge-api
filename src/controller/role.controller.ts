import { Response, Request } from 'express';
import { RoleService } from '../service/role.service';

export class RoleController {
    async createRole(req: Request, res: Response) {
        try {
            return new RoleService().createRole(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async findRoles(req: Request, res: Response) {
        try {
            return new RoleService().findRoles(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async findRole(req: Request, res: Response) {
        try {
            return new RoleService().findRole(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            return new RoleService().updateRole(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            return new RoleService().deleteRole(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }
}
