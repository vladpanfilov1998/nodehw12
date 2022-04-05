import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import {IUser, User} from '../../entity';
import {IUserRepository} from './user.repository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', {email})
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getUserByParams(filteredObject: Partial<IUser>): Promise<IUser | undefined> {
        return getManager().getRepository(User).findOne(filteredObject);
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(id: number, password: string): Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({id}, {
                password,
            });
    }

    public async deleteUser(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(User)
            .delete({id});
    }
}

export const userRepository = new UserRepository();