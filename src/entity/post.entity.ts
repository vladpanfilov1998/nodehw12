import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

import {config} from '../config';
import {IComment, Comment} from './comment.entity';
import {CommonFields, ICommonFields} from './commonFields.entity';
import {User} from './user.entity';

export interface IPost extends ICommonFields {
    userId: number;
    title: string;
    text: string;
    comments: IComment[];
}

@Entity('Posts', {database: config.MYSQL_DATABASE_NAME})
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    text: string;

    @Column({
        type: 'int',
    })
    userId: number;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name: 'userId'})
    user: User;
}