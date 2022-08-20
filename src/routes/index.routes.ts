import { Router, Request, Response } from 'express';

const router = Router();

router.route('').get((req: Request, res: Response) => {
    return res.status(200).json({
        status: 'success',
        message: 'Welcome to equipedge api',
    });
});

export default router;
