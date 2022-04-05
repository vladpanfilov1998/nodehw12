import joi from 'joi';

import {validatorRegex} from '../constants';
import {validatorErrorMessages} from '../error';

export const commonValidator = {
    emailValidator: joi.string()
        .email()
        .trim(true)
        .required()
        .messages({
            'string:email': `${validatorErrorMessages.notValid}`,
        }),

    passwordValidator: joi.string()
        .min(8)
        .max(25)
        .pattern(validatorRegex.password)
        .required(),

    textValidator: joi.string()
        .max(255)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.max': validatorErrorMessages.stringMax,
        }),

    firstLastNameValidator: joi.string()
        .alphanum()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.min': validatorErrorMessages.stringMinUser,
            'string.max': validatorErrorMessages.stringMaxUser,
        }),
};