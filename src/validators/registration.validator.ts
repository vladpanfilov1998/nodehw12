import joi from 'joi';

import {validatorRegex} from '../constants';
import {commonValidator} from './common.validator';
import {IUser} from '../entity';
import {validatorErrorMessages} from '../error';

export const registrationValidator: joi.ObjectSchema<Partial<IUser>> = joi.object({
    firstName: commonValidator.firstLastNameValidator,
    lastName: commonValidator.firstLastNameValidator,
    age: joi.number()
        .min(0)
        .max(120)
        .message(`Age ${validatorErrorMessages.notValid}`),
    phone: joi.string()
        .length(10)
        .pattern(validatorRegex.phone)
        .required()
        .messages({
            'string.pattern.base': `Phone ${validatorErrorMessages.notValid}`,
        }),
    email: commonValidator.emailValidator,
    password: commonValidator.passwordValidator
        .messages({
            'string.pattern.base': validatorErrorMessages.passwordMessage,
        }),
});