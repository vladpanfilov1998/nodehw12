import {Router} from 'express';

import {userController} from '../controller';
import {authMiddleware, tokenTypeMiddleware, userMiddleware} from '../middlewares';

const router = Router();

router.get('/', userController.getUsers);
router.delete(
    '/:id',
    tokenTypeMiddleware.tokenTypeAccess,
    authMiddleware.checkToken,
    userMiddleware.checkUserByParams,
    userController.deleteUser,
);

export const userRouter = router;