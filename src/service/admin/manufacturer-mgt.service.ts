import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { IManufacturer } from '../../interface/manufacturer.interface';
import { IRole } from '../../interface/role.interface';
import log from '../../logger';
import Manufacturer from '../../model/manufacturer.model';
import Role from '../../model/role.model';

export class ManufacturerService {
    async createManufacturer(req: Request, res: Response) {
        try {
            let { fullName, email, phone, password } = req.body;
            // check if manufacturer exist
            const existEmail = await Manufacturer.findOne({ email }).exec();
            if (existEmail) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email has been registered by another user',
                    code: 400,
                });
            }
            const existPhone = await Manufacturer.findOne({ phone }).exec();
            if (existPhone) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Phone has been registered by another user',
                    code: 400,
                });
            }
            // select role to assign to user
            const role: IRole | null = await Role.findOne({
                name: 'manufacturer',
                level: 3,
            }).exec();
            if (!role) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Role not found',
                    code: 404,
                });
            }
            // create user
            let manufacturer: IManufacturer = new Manufacturer({
                fullName,
                email,
                phone,
                password,
                role: role.name,
                level: role.level,
            });
            await manufacturer.save();
            // remove password from response
            let newManufacturer = _.pick(manufacturer, [
                'fullName',
                'email',
                'phone',
                'createdAt',
                'updatedAt',
            ]);
            return res.status(201).json({
                status: 'success',
                message: 'New manufacturer created',
                data: { newManufacturer },
                code: 201,
            });
        } catch (error: any) {
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid manufacturer ID',
                    code: 400,
                });
            }
        }
    }

    async findManufacturers(req: Request, res: Response) {
        try {
            // check if available exist
            const manufacturers: IManufacturer[] = await Manufacturer.find(
                {},
            ).exec();
            if (manufacturers.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: 'No manufacturers available',
                    data: { manufacturers },
                    code: 200,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'All manufacturers available',
                recordCount: manufacturers.length,
                data: { manufacturers },
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

    async findManufacturer(req: Request, res: Response) {
        try {
            const manufacturerId = req.params.manufacturerId;
            const manufacturer = await Manufacturer.findOne({
                _id: manufacturerId,
            });
            if (!manufacturer) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Manufacturer not found',
                    code: 404,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Manufacturer fetched successfully',
                data: { manufacturer },
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid manufacturer ID',
                    code: 400,
                });
            }
        }
    }

    async updateManufacturer(req: Request, res: Response) {
        try {
            const manufacturerId = req.params.manufacturerId;
            const manufacturer = await Manufacturer.findOne({
                _id: manufacturerId,
            }).exec();
            const fieldsToUpdate = _.pick(req.body, [
                'fullName',
                'email',
                'phone',
                'role',
                'level',
            ]);
            const updatedManufacturer = await Manufacturer.findOneAndUpdate(
                { _id: manufacturerId },
                fieldsToUpdate,
                { new: true },
            ).exec();
            return res.status(200).json({
                status: 'success',
                message: 'Manufacturer updated successully',
                data: { updatedManufacturer },
                code: 200,
            });
        } catch (error: any) {
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid manufacturer ID',
                    code: 400,
                });
            }
        }
    }

    async deleteManufacturer(req: Request, res: Response) {
        try {
            const manufacturerId = req.params.manufacturerId;
            const manufacturer = await Manufacturer.findOne({
                _id: manufacturerId,
            }).exec();
            await Manufacturer.findOneAndDelete({ _id: manufacturerId }).exec();
            return res.status(204).json({
                status: 'success',
                message: 'Manufacturer deleted successfully',
                data: null,
                code: 204,
            });
        } catch (error: any) {
            log.error(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid manufacturer ID',
                    code: 400,
                });
            }
        }
    }
}
