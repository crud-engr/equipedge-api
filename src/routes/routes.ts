import { Express, Request, Response, NextFunction } from 'express';
import IndexRoute from './index.routes';
import HealthcheckRoute from './healthcheck.routes';
import RoleRoute from './role.routes';
import UserMgtRoute from './admin/user-mgt.routes';
import ManufacturerMgtRoute from './admin/manufacturer-mgt.routes';
import ProductMgtRoute from './admin/product-mgt.routes';
import UserAuthRoute from './user/auth.routes';
import { AuthMiddleware } from '../../middleware/auth.middleware';

export default function (app: Express) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        );
        next();
    });
    // general
    app.use('/', IndexRoute);
    app.use('/healthcheck', HealthcheckRoute);

    app.use('/api/roles', new AuthMiddleware().getAccessToken, RoleRoute);
    // users
    app.use('/api/users/auth', UserAuthRoute)

    // admin
    app.use('/api/admin/products', ProductMgtRoute);
    app.use('/api/admin/users', UserMgtRoute);
    app.use('/api/admin/manufacturers', ManufacturerMgtRoute);
}
