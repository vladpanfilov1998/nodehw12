import {NextFunction, Response} from 'express';

import {IUser} from '../entity';
import {ErrorHandler, errorMessages} from '../error';
import {IRequestExtended} from '../interfaces';
import {postService} from '../services';
import {postValidator} from '../validators';

class PostMiddleware {
    public postValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {
                title, text,
            } = req.body;

            const payload = {
                text,
                title,
            };

            const {error} = postValidator.validate(payload);

            if (error) {
                next(new ErrorHandler(`Error in Post Data : ${error.message}`, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async verifyUserPost(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {postId} = req.params;
            const {id} = req.user as IUser;

            const userPost = await postService.getUserPostByParams({id: +postId, userId: id});

            if (!userPost) {
                next(new ErrorHandler(errorMessages.post.notFound, 404));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();