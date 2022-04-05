import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import {config} from '../config';
import {CommonFields, ICommonFields} from './commonFields.entity';
import {User} from './user.entity';
import {ActionTokenEnum} from '../constants';

export interface IActionToken extends ICommonFields {
    userId: number;
    actionToken: string;
    type: ActionTokenEnum;
}

@Entity('ActionTokens', {database: config.MYSQL_DATABASE_NAME})
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'int',
    })
    userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    actionToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    type: ActionTokenEnum;

    @OneToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;
}