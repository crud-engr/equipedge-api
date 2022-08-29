import { Request, Response, NextFunction } from 'express';
import _, { omit } from 'lodash';
import { IRole } from '../../interface/role.interface';
import { IProduct } from '../../interface/product.interface';
import log from '../../logger';
import Product from '../../model/product.model';

export class ProductService {
    async createProduct(req: Request, res: Response) {
        try {
            let { name, image, price, quantityStock, description, userId } =
                req.body;
            // user id should later be picked from JWT
            // create product
            let product: IProduct = new Product({
                name,
                image,
                price,
                quantityStock,
                description,
                userId: '630367b3b13b9a97b655e964',
            });
            await product.save();

            return res.status(201).json({
                status: 'success',
                message: 'New product created',
                data: { product },
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

    async findProducts(req: Request, res: Response) {
        try {
            // check if product exist
            const products: IProduct[] = await Product.find({}).exec();
            if (products.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: 'No available products',
                    code: 200,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'All available products',
                recordCount: products.length,
                data: { products },
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

    async findProduct(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            const product = await Product.findOne({
                _id: productId,
            });
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found',
                    code: 404,
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Product fetched successfully',
                data: { product },
                code: 200,
            });
        } catch (error: any) {
            log.error(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid product ID',
                    code: 400,
                });
            }
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            const product = await Product.findOne({
                _id: productId,
            }).exec();
            const fieldsToUpdate = _.pick(req.body, [
                'name',
                'description',
                'price',
                'quantityStock',
            ]);
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: productId },
                fieldsToUpdate,
                { new: true },
            ).exec();
            return res.status(200).json({
                status: 'success',
                message: 'Product updated successully',
                data: { updatedProduct },
                code: 200,
            });
        } catch (error: any) {
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid product',
                    code: 400,
                });
            }
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            const product = await Product.findOne({
                _id: productId,
            }).exec();
            await Product.findOneAndDelete({ _id: productId }).exec();
            return res.status(204).json({
                status: 'success',
                message: 'Product deleted successfully',
                data: null,
                code: 204,
            });
        } catch (error: any) {
            log.error(error.message);
            if (error.message.startsWith('Cast to ObjectId')) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid product',
                    code: 400,
                });
            }
        }
    }
}
