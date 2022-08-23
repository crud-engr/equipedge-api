import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export class ManufacturerValidation {
    async validateCreateManufacturer(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            fullName: Joi.string().required().messages({
                'string.required': 'full name is required',
                'string.empty': 'full name should not be empty',
            }),
            phone: Joi.string().min(11).required().messages({
                'string.required': 'phone number is required',
                'string.empty': 'phone number cannot be empty',
                'string.min': `phone number cannot be less than {#limit}`,
            }),
            email: Joi.string()
                .required()
                .email({ minDomainSegments: 2, tlds: { allow: false } })
                .trim()
                .label('Email')
                .messages({
                    'string.required': 'email is required',
                    'string.empty': 'email cannot be empty',
                    'string.email': 'email must be a valid email address',
                }),
            password: Joi.string().required().min(6).messages({
                'string.required': 'password is required',
                'string.min': 'password must be at least 6 characters',
                'string.empty': 'password should not be empty',
            }),
            confirmPassword: Joi.ref('password'),
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
