import {Request, Response} from 'express';
import {UpdateResult} from 'typeorm';

import {IComment, IUser} from '../entity';
import {IRequestExtended} from '../interfaces';
import {commentService} from '../services';

class CommentController {
    public async createComment(req: IRequestExtended, res: Response): Promise<Response<IComment>> {
        const {id} = req.user as IUser;
        const {postId} = req.params;
        const {text} = req.body;
        const createdComment = await commentService.createComment({
            authorId: id,
            postId: +postId,
            text,
        });
        return res.status(200).json(createdComment);
    }

    public async getUserComments(req: Request, res: Response): Promise<Response<IComment[]>> {
        const {userId} = req.params;
        const userComments = await commentService.getUserComments(userId);
        return res.status(200).json(userComments);
    }

    public async setLikeDislike(req: Request): Promise<UpdateResult | undefined> {
        const {
            action,
            commentId,
        } = req.body;
        return commentService.setLikeDislike(action, commentId);
    }
}

export const commentController = new CommentController();