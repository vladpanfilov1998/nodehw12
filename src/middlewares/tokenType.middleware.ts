import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../interfaces';
import {config} from '../config';

class TokenTypeMiddleware {
    public tokenTypeAccess(req: IRequestExtended, res: Response, next: NextFunction) {
        req.tokenType = config.TYPE_ACCESS;
        next();
    }

    public tokenTypeRefresh(req: IRequestExtended, res: Response, next: NextFunction) {
        req.tokenType = config.TYPE_REFRESH;
        next();
    }

    public tokenTypeAction(req: IRequestExtended, res: Response, next: NextFunction) {
        req.tokenType = config.TYPE_ACTION;
        next();
    }
}

export const tokenTypeMiddleware = new TokenTypeMiddleware();