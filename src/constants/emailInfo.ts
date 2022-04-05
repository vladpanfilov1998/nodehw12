import {EmailActionEnum} from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to My App',
        templateName: 'welcome',
    },
    [EmailActionEnum.CHANGE_PASSWORD]: {
        subject: 'Change password',
        templateName: 'changePassword',
    },
    [EmailActionEnum.ACCOUNT_DELETE]: {
        subject: 'Account deleted',
        templateName: 'accountDelete',
    },
};