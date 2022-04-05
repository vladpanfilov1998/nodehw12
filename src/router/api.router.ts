import {Router} from 'express';

import {authRouter} from './auth.router';
import {commentRouter} from './comment.router';
import {postRouter} from './post.router';
import {userRouter} from './user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/comments', commentRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
        });
});

export const apiRouter = router;