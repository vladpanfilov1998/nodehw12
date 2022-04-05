import nodemailer, {SentMessageInfo} from 'nodemailer';
import Email from 'email-templates';
import path from 'path';

import {config} from '../config';
import {constants, EmailActionEnum, emailInfo} from '../constants';

class EmailService {
    templateRenderer = new Email({
        views: {
            root: path.join(__dirname, '../', 'email-templates'),
        },
    });

    transport = nodemailer.createTransport({
        from: 'No reply',
        service: 'Gmail',
        auth: {
            user: config.NO_REPLY_EMAIL,
            pass: config.NO_REPLY_EMAIL_PASSWORD,
        },
    });

    public async sendMail(userEmail: string, action: EmailActionEnum, context = {}): Promise<SentMessageInfo> {
        const {subject, templateName} = emailInfo[action];

        Object.assign(context, {githubUrl: constants.GITHAB_URL});

        const html = await this.templateRenderer.render(templateName, context);

        return this.transport.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();