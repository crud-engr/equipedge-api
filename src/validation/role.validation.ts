import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export class RoleValidation {
    async validateRole(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'string.required': 'role name is required',
                'string.empty': 'role name should not be empty',
            }),
            level: Joi.number().required().messages({
                'string.required': 'role level is required',
                'string.empty': 'role level cannot be empty',
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
