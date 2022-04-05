import joi from 'joi';

import {commonValidator} from './common.validator';

export const updatePasswordValidator = {
    email: joi
        .object({
            email: commonValidator.emailValidator,
        }),
    password: joi.object({
        password: commonValidator.passwordValidator,
        confirmPassword: commonValidator.passwordValidator,
    }),
};