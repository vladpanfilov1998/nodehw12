import joi from 'joi';

import {commonValidator} from './common.validator';
import {IUser} from '../entity';
import {validatorErrorMessages} from '../error';

export const loginValidator: joi.ObjectSchema<Partial<IUser>> = joi.object({
    email: commonValidator.emailValidator,
    password: commonValidator.passwordValidator
        .messages({
            'string:pattern.base': `${validatorErrorMessages.notValid}`,
        }),
});