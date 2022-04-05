import joi from 'joi';

import {commonValidator} from './common.validator';
import {IPost} from '../entity';
import {validatorErrorMessages} from '../error';

export const postValidator: joi.ObjectSchema<Partial<IPost>> = joi.object({
    title: joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': validatorErrorMessages.stringEmpty,
            'string.max': validatorErrorMessages.stringMax,
        }),
    text: commonValidator.textValidator,
});