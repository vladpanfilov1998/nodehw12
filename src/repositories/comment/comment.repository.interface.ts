import {Repository, UpdateResult} from 'typeorm';

import {Comment, IComment} from '../../entity';

export interface ICommentRepository {
    createComments(comment: Partial<IComment>): Promise<IComment>;

    getUserComments(id: number): Promise<IComment[]>;

    getQueryRunner(): Promise<Repository<Comment>>;

    getComment(queryRunner: any, id: number): Promise<IComment>;

    setLike(queryRunner: Repository<Comment>, comment: IComment, id: number): Promise<UpdateResult>;

    setDislike(queryRunner: Repository<Comment>, comment: IComment, id: number):
        Promise<UpdateResult>;
}