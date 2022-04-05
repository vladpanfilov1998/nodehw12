import {DeleteResult, UpdateResult} from 'typeorm';

import {IUser} from '../../entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;

    getUserByEmail(email: string): Promise<IUser | undefined>;

    getUserByParams(filteredObject: Partial<IUser>): Promise<IUser | undefined>;

    createUser(user: IUser): Promise<IUser>;

    updateUser(id: number, password: string): Promise<UpdateResult>;

    deleteUser(id: number): Promise<DeleteResult>;
}