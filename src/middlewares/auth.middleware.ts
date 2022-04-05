import {NextFunction, Response} from 'express';

import {ErrorHandler, errorMessages} from '../error';
import {IRequestExtended} from '../interfaces';
import {tokenService, userService} from '../services';

class AuthMiddleware {
    public async checkToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const token = req.get('Authorization');

            if (!token) {
                next(new ErrorHandler(errorMessages.token.emptyToken, 400));
                return;
            }

            const {tokenType} = req;

            const tokenFromDb = await tokenService.getTokenPairFromDb(token, tokenType);

            if (!tokenFromDb) {
                next(new ErrorHandler(errorMessages.token.notValid, 401));
                return;
            }

            const {userEmail} = await tokenService.verifyToken(token as string, tokenType);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler(errorMessages.token.notValid, 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();