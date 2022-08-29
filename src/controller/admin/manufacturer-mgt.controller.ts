import { Response, Request } from 'express';
import log from '../../logger';
import { ManufacturerService } from '../../service/admin/manufacturer-mgt.service';

export class ManufacturerController {
    async createManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().createManufacturer(req, res);
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

    async findManufacturers(req: Request, res: Response) {
        try {
            return new ManufacturerService().findManufacturers(req, res);
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

    async findManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().findManufacturer(req, res);
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

    async updateManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().updateManufacturer(req, res);
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

    async deleteManufacturer(req: Request, res: Response) {
        try {
            return new ManufacturerService().deleteManufacturer(req, res);
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
