import joi from 'joi';

import {commonValidator} from './common.validator';
import {IComment} from '../entity';

export const commentValidator: joi.ObjectSchema<Partial<IComment>> = joi.object({
    text: commonValidator.textValidator,
});