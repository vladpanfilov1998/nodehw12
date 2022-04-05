import {DeleteResult} from 'typeorm';

import {IToken, Token} from '../../entity';
import {ITokenDataToSave} from '../../interfaces';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<IToken>;

    findTokenByUserId(userId: number): Promise<IToken | undefined>;

    findByParams(filterObject: Partial<IToken>): Promise<Token | undefined>

    deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult>;
}