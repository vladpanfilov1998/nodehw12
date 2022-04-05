import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import {config} from '../config';
import {CommonFields, ICommonFields} from './commonFields.entity';
import {User} from './user.entity';

export interface IToken extends ICommonFields {
    userId: number;
    refreshToken: string;
    accessToken: string;
}

@Entity('Tokens', {database: config.MYSQL_DATABASE_NAME})
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'int',
    })
    userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    accessToken: string;

    @OneToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;
}