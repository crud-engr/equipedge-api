import { Router } from 'express';

import { UserController } from '../../controller/admin/user-mgt.controller';
import { UserValidation } from '../../validation/user.validation';

const router = Router();
// only admins can perform this operations
router
    .route('/')
    .post(
        new UserValidation().validateCreateUser,
        new UserController().createUser,
    )
    .get(new UserController().findUsers);

router
    .route('/:userId')
    .get(new UserController().findUser)
    .patch(new UserController().updateUser)
    .delete(new UserController().deleteUser);

export default router;
