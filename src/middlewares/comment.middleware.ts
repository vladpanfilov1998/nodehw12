import {NextFunction, Response} from 'express';

import {actionType} from '../constants';
import {ErrorHandler, errorMessages} from '../error';
import {IRequestExtended} from '../interfaces';
import {postService} from '../services';
import {commentValidator} from '../validators';

class CommentMiddleware {
    public commentValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {
                text,
            } = req.body;

            const payload = {
                text,
            };

            const {error} = commentValidator.validate(payload);

            if (error) {
                next(new ErrorHandler(`Error in Comment Data : ${error.message}`, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkIsPostExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {postId} = req.params;

            const userPost = await postService.getUserPostByParams({id: +postId});

            if (!userPost) {
                next(new ErrorHandler(errorMessages.post.notFound, 404));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public verifyActionType(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {action} = req.body;

            if (!action) {
                next(new ErrorHandler(errorMessages.action.emptyAction, 400));
                return;
            }

            if (action !== actionType.TYPE_LIKE || action !== actionType.TYPE_DISLIKE) {
                next(new ErrorHandler(errorMessages.action.notValid, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();