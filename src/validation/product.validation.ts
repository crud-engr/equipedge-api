import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export class ProductValidation {
    async validateCreateProduct(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'string.required': 'product name is required',
                'string.empty': 'product name should not be empty',
            }),
            image: Joi.string().min(11).required().messages({
                'string.required': 'product image is required',
                'string.empty': 'product image should not be empty',
            }),
            price: Joi.number().required().messages({
                'number.required': 'product price is required',
                'number.empty': 'product price should not be empty',
            }),
            quantityStock: Joi.number().required().messages({
                'number.required': 'product quantity is required',
                'num.empty': 'product quantity should not be empty',
            }),
            description: Joi.string().required().messages({
                'string.required': 'product description is required',
                'string.empty': 'product description should not be empty',
            }),
        }).options({ abortEarly: true });

        try {
            const value = await schema.validateAsync(req.body);
            next();
        } catch (error: any) {
            let errMessage = error.details[0].message.split(' ');
            let [field, ...others] = errMessage;
            field = field.replace(/['"]+/g, '');
            let newErrorMessage = `${field} ${others.join(' ')}`;
            return res.status(422).json({
                status: 'error',
                message: newErrorMessage,
                code: 422,
            });
        }
    }
}
