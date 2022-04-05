import {EntityRepository, getManager, Repository} from 'typeorm';

import {ActionToken, IActionToken} from '../../entity';
import {IActionTokenRepository} from './actionToken.repository.interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async createToken(token: Partial<IActionToken>): Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    public async getTokenByParams(filteredObject: Partial<IActionToken>): Promise<ActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(filteredObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();