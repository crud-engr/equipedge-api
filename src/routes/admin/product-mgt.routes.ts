import { Router } from 'express';
import { ProductController } from '../../controller/admin/product-mgt.controller';
import { ProductValidation } from '../../validation/product.validation';

const router = Router();
// only admins can perform this operations
router
    .route('/')
    .post(
        new ProductValidation().validateCreateProduct,
        new ProductController().createProduct,
    )
    .get(new ProductController().findProducts);

router
    .route('/:productId')
    .get(new ProductController().findProduct)
    .patch(new ProductController().updateProduct)
    .delete(new ProductController().deleteProduct);

// get all products created by a manufacturer

export default router;
