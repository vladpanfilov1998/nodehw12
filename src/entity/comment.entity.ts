import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import {config} from '../config';
import {CommonFields} from './commonFields.entity';
import {Post} from './post.entity';
import {User} from './user.entity';

export interface IComment {
    text: string;
    authorId: number;
    postId: number;
    like: number;
    dislike: number;
}

@Entity('Comments', {database: config.MYSQL_DATABASE_NAME})
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    text: string;

    @Column({
        type: 'int',
    })
    like: number;

    @Column({
        type: 'int',
    })
    dislike: number;

    @Column({
        type: 'int',
    })
    authorId: number;

    @Column({
        type: 'int',
    })
    postId: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: 'authorId'})
    user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({name: 'postId'})
    post: Post;
}