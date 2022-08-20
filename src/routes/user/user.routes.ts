import { Router } from 'express';

import { UserController } from '../../controller/user/user.controller';
import { UserValidation } from '../../validation/user.validation';

const router = Router();

router
    .route('/')
    .post(
        new UserValidation().validateCreateUser,
        new UserController().createUser,
    );

export default router;
