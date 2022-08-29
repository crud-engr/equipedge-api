import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export class AuthMiddleware {
    async getAccessToken(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        let token;
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(400).json({
                status: 'error',
                message: 'You are not authorized!',
                code: 400,
            });
        }
        // decode token
        const decoded = jwt.verify(token, config.get('jwt_secret'));
        console.log('JWT DECODED::: ', decoded)
        // { id: '630a98201d63269d50d7363e', iat: 1661692532, exp: 1661778932 }
        

        // TO SOLVE THIS SOLUTION -> CREATE A JWT TABLE AND STORE USERS TOKEN
    }
}
