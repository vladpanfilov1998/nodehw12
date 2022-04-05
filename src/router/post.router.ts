import {Router} from 'express';

import {postController} from '../controller';
import {authMiddleware, postMiddleware, tokenTypeMiddleware} from '../middlewares';

const router = Router();

router.post(
    '/',
    postMiddleware.postValidator,
    tokenTypeMiddleware.tokenTypeAccess,
    authMiddleware.checkToken,
    postController.createPost,
);
router.get('/:userId', postController.getUserPosts);
router.patch(
    '/:postId',
    postMiddleware.postValidator,
    tokenTypeMiddleware.tokenTypeAccess,
    authMiddleware.checkToken,
    postMiddleware.verifyUserPost,
    postController.updatePost,
);

export const postRouter = router;