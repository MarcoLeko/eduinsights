import {inject, injectable} from 'inversify';
import sendgridMail from '@sendgrid/mail';
import {MailData} from '@sendgrid/helpers/classes/mail';
import {TYPES} from '../../di-config/types';
import environment from '../utils/environment';

@injectable()
export default class EmailCreator {

    private static EMAIL_FROM = 'no-reply@help-educate.net';
    private static TEMPLATE_ID_EMAIL_VERIFY = 'd-8ca7682e287d47428c351e7854d98567';

    constructor(
        @inject(TYPES.ENVIRONMENTAL_CONFIG) private environmentFactory: Function
    ) {
        const {SEND_GRID_API_KEY} = this.environmentFactory(environment);
        sendgridMail.setApiKey(SEND_GRID_API_KEY);
    }

    public async sendEmailVerificationLink(data: any) {
        const {firstName, email} = data;
        const token = Math.random().toString(36).substr(2);
        const message: MailData = {
            from: EmailCreator.EMAIL_FROM,
            personalizations: [{
                to: [{
                    email,
                }],
                dynamicTemplateData: {
                    firstName,
                    'verificationLink': `http://localhost:4200/verify-email?token=${token}`
                },
            }],
            templateId: EmailCreator.TEMPLATE_ID_EMAIL_VERIFY
        };

        await sendgridMail.send(message);

        // expires in 7 days from now
        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        return {expireAt, token};
    }
}
