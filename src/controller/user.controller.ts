import {NextFunction, Request, Response} from 'express';
import {DeleteResult} from 'typeorm';

import {IUser} from '../entity';
import {emailService, userService} from '../services';
import {EmailActionEnum} from '../constants';
import {userRepository} from '../repositories';

class UserController {
    public async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[] | Error> | undefined> {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e: any) {
            next(e);
        }
    }

    public async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response<IUser | Error> | undefined> {
        try {
            const {email} = req.body;
            const user = await userService.getUserByEmail(email);
            return res.json(user);
        } catch (e: any) {
            next(e);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response<DeleteResult | Error> | undefined> {
        try {
            const {id} = req.params;
            const user = await userRepository.getUserByParams({id: +id});
            await emailService.sendMail(user?.email as string, EmailActionEnum.ACCOUNT_DELETE, {userName: user?.firstName});
            const deletedUser = await userService.deleteUser(id);
            return res.json(deletedUser);
        } catch (e: any) {
            next(e);
        }
    }
}

export const userController = new UserController();