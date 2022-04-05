import {UpdateResult} from 'typeorm';

import {IComment} from '../entity';
import {ErrorHandler, errorMessages} from '../error';
import {commentRepository} from '../repositories';

class CommentService {
    public async createComment(comment: Partial<IComment>): Promise<IComment> {
        return commentRepository.createComments(comment);
    }

    public async getUserComments(id: string): Promise<IComment[]> {
        return commentRepository.getUserComments(+id);
    }

    public async setLikeDislike(action: string, commentId: number)
        : Promise<UpdateResult | undefined> {
        const queryRunner = await commentRepository.getQueryRunner();
        const comment = await commentRepository.getComment(queryRunner, commentId);

        if (!comment) {
            throw new ErrorHandler(errorMessages.wrongCommentId, 400);
        }

        if (action === 'like') {
            return commentRepository.setLike(queryRunner, comment, commentId);
        }
        if (action === 'dislike') {
            return commentRepository.setDislike(queryRunner, comment, commentId);
        }
    }
}

export const commentService = new CommentService();