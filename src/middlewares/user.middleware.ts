import {NextFunction, Response} from 'express';

import {ErrorHandler, errorMessages} from '../error';
import {IRequestExtended} from '../interfaces';
import {userService} from '../services';
import {updatePasswordValidator, loginValidator, registrationValidator} from '../validators';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDb = await userService.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler(errorMessages.user.notFound, 404));
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkIsUserNotExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const userFromDb = await userService.getUserByEmail(req.body.email);

            if (userFromDb) {
                next(new ErrorHandler(errorMessages.user.exist, 400));
                return;
            }
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkUserByParams(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            if (+req.params.id !== req.user?.id) {
                next(new ErrorHandler(errorMessages.noAccess, 403));
                return;
            }
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public checkConfirmPassword(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {password, confirmPassword} = req.body;

            if (password !== confirmPassword) {
                next(new ErrorHandler(errorMessages.passNoMatch, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public registrationValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {
                firstName, lastName, age, phone, email, password,
            } = req.body;

            const payload = {
                firstName,
                lastName,
                age,
                phone,
                email,
                password,
            };

            const {error} = registrationValidator.validate(payload);

            if (error) {
                next(new ErrorHandler(`Error in User Data : ${error.message}`, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public loginValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {email, password} = req.body;

            const payload = {
                email,
                password,
            };

            const {error} = loginValidator.validate(payload);

            if (error) {
                next(new ErrorHandler(`${error.message}`, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public emailValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {error} = updatePasswordValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(`${error.message}`, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public passwordValidator(req: IRequestExtended, res: Response, next: NextFunction): void | Error {
        try {
            const {error} = updatePasswordValidator.password.validate(req.body);

            if (error) {
                next(new ErrorHandler(`${error.message}`, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();