import { Response, Request } from 'express';
import { ManufacturerService } from '../../service/admin/manufacturer-mgt.service';

export class ManufacturerController {
    async createManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().createManufacturer(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async findManufacturers(req: Request, res: Response) {
        try {
            return new ManufacturerService().findManufacturers(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async findManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().findManufacturer(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async updateManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().updateManufacturer(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }

    async deleteManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().deleteManufacturer(req, res);
        } catch (error: any) {
            return res.status(400).json({
                status: 'error',
                message: `${error.message}`,
            });
        }
    }
}
