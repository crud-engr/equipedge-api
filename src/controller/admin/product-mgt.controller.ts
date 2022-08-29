import { Response, Request } from 'express';
import log from '../../logger';
import { ProductService } from '../../service/admin/product-mgt.service';

export class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            return new ProductService().createProduct(req, res);
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

    async findProducts(req: Request, res: Response) {
        try {
            return new ProductService().findProducts(req, res);
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

    async findProduct(req: Request, res: Response) {
        try {
            return new ProductService().findProduct(req, res);
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

    async updateProduct(req: Request, res: Response) {
        try {
            return new ProductService().updateProduct(req, res);
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

    async deleteProduct(req: Request, res: Response) {
        try {
            return new ProductService().deleteProduct(req, res);
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
