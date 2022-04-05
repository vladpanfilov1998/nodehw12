import {Router} from 'express';

import {commentController} from '../controller';
import {authMiddleware, commentMiddleware, tokenTypeMiddleware} from '../middlewares';

const router = Router();

router.post(
    '/:postId',
    commentMiddleware.commentValidator,
    commentMiddleware.checkIsPostExist,
    tokenTypeMiddleware.tokenTypeAccess,
    authMiddleware.checkToken,
    commentController.createComment,
);
router.get('/:userId', commentController.getUserComments);
router.post('/action', commentMiddleware.verifyActionType, commentController.setLikeDislike);

export const commentRouter = router;