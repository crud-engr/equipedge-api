import { Response, Request } from 'express';
import { UserService } from '../../service/user/user.service';

export class UserController {
    async createUser(req: Request, res: Response) {
       try {
           return new UserService().createUser(req, res)
       } catch (error: any) {
        console.log(error.message)
           return res.status(400).json({
               status: 'error',
               message: `${error.message}`,
           });
       }
    }
}

