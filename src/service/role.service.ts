import { Request, Response } from 'express';
import _ from 'lodash';

import { IRole } from '../interface/role.interface';
import log from '../logger';
import Role from '../model/role.model';

export class RoleService {
    async createRole(req: Request, res: Response) {
        try {
            const { name, level } = req.body;
            // check if role level exist
            const existRoleLevel = await Role.exists({ level });
            if (existRoleLevel) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Role level already exist',
                    code: 400,
                });
            }
            // check if role name exist
            const existRoleName = await Role.exists({ name });
            if (existRoleName) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Role name already exist',
                    code: 400,
                });
            }
            // create role
            const role: IRole = await Role.create({
                name,
                level,
            });
            return res.status(201).json({
                status: 'success',
                message: 'New Role Created',
                data: { role },
                code: 201,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 'error',
                message: 'Server error',
                code: 500,
            });
        }
    }

    async findRoles(req: Request, res: Response) {
        try {
            const roles: IRole[] = await Role.find({}).exec();
            if (roles.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: 'No roles available',
                    data: { roles },
                    code: 200,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'All available roles',
                recordCount: roles.length,
                data: { roles },
                code: 200,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 'error',
                message: 'Server error',
                code: 500,
            });
        }
    }

    async findRole(req: Request, res: Response) {
        try {
            const roleId = req.params.roleId;
            const role = await Role.findOne({
                _id: roleId,
            });
            if (!role) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Role not found',
                    code: 404,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Role fetched successfully',
                data: { role },
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid role ID to fetch role',
                    code: 400,
                });
            }
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const roleId = req.params.roleId;
            const role = await Role.findOne({
                _id: roleId,
            }).exec();
            const fieldsToUpdate = _.pick(req.body, ['name', 'level']);
            const updatedRole = await Role.findOneAndUpdate(
                { _id: roleId },
                fieldsToUpdate,
                { new: true },
            ).exec();
            return res.status(200).json({
                status: 'success',
                message: 'Role updated successully',
                data: { updatedRole },
                code: 200,
            });
        } catch (error: any) {
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid role ID to fetch role',
                    code: 400,
                });
            }
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            const roleId = req.params.roleId;
            const role = await Role.findOne({
                _id: roleId,
            }).exec();
            await Role.findOneAndDelete(
                { _id: roleId },
            ).exec();
            return res.status(204).json({
                status: 'success',
                message: 'Role deleted successfully',
                data: null,
                code: 204,
            });
        } catch (error: any) {
          log.error(error.message)
          console.log(error.message)
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid role ID to fetch role',
                    code: 400,
                });
            }
        }
    }
}
