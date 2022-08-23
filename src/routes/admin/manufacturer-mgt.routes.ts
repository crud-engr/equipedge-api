import { Router } from 'express';

import { ManufacturerController } from '../../controller/admin/manufacturer-mgt.controller';
import { ManufacturerValidation } from '../../validation/manufacturer.validation';

const router = Router();
// only admins can perform this operations
router
    .route('/')
    .post(
        new ManufacturerValidation().validateCreateManufacturer,
        new ManufacturerController().createManufacturer,
    )
    .get(new ManufacturerController().findManufacturers);

router
    .route('/:manufacturerId')
    .get(new ManufacturerController().findManufacturer)
    .patch(new ManufacturerController().updateManufacturer)
    .delete(new ManufacturerController().deleteManufacturer);

export default router;
