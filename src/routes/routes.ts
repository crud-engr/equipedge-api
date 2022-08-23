import { Express, Request, Response, NextFunction } from 'express';
import IndexRoute from './index.routes';
import HealthcheckRoute from './healthcheck.routes';
import RoleRoute from './role.routes';
import UserMgtRoute from './admin/user-mgt.routes';
import ManufacturerMgtRoute from './admin/manufacturer-mgt.routes';

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

    // role
    app.use('/api/roles', RoleRoute);

    // user
    // app.use('/api/users', UserRoute);

    // admin
    app.use('/api/admin/users', UserMgtRoute);
    app.use('/api/admin/manufacturers', ManufacturerMgtRoute);
}
