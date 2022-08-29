import { Router } from 'express';
import { AuthController } from '../../controller/user/auth.controller';
import { AuthValidation } from '../../validation/user-auth.validation';

const router = Router();

router
    .route('/signup')
    .post(new AuthValidation().validateSignup, new AuthController().signup);

router.route('/activate').post(new AuthController().activateAccount);

router.route('/signin').post(new AuthController().signin);

router.route('/forgot-password').post(new AuthController().forgotPassword);

router.route('/reset-password').patch(new AuthController().resetPassword);

router.route('/resend-token').post(new AuthController().resendToken)

export default router;
