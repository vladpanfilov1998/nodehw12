import { ActionToken, IActionToken } from '../../entity';

export interface IActionTokenRepository {
    createToken(token: Partial<IActionToken>): Promise<ActionToken>;
    getTokenByParams(filteredObject: Partial<IActionToken>): Promise<ActionToken | undefined>;
}