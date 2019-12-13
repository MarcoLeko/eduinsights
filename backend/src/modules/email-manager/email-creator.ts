import {injectable} from 'inversify';
import handlebars from 'handlebars';
import fs from 'fs';
import {User} from "../../types/types";
import path from 'path';
import {joinDir} from "../utils/paths";
import sendgridMail from '@sendgrid/mail';
import {MailData} from '@sendgrid/helpers/classes/mail';
import {ClientResponse} from '@sendgrid/client/src/response';

@injectable()
export default class EmailCreator {

    private static EMAIL_FROM = 'no-reply@help-educate.com';

    constructor() {
        sendgridMail.setApiKey(process.env.SEND_GRID_API_KEY as string);
    }

    private static transformTemplate(data: Object, path: string): string {
        const html = handlebars.compile(fs.readFileSync(path, 'utf-8'));
        return html(data);
    }

    public sendEmailVerificationLink(data: Partial<User>): Promise<[ClientResponse, {}]> {
            const {firstName, email} = data;
            const token = Math.random().toString(36).substr(2);

            const message: MailData = {
                to: email,
                from: EmailCreator.EMAIL_FROM,
                subject: 'Help-educate Support',
                html: EmailCreator.transformTemplate({
                    firstName,
                    link: `https://google.com?token=${token}`
                }, path.join(joinDir('src/modules/email-manager/templates/email-verification.html')))
            };
            return sendgridMail.send(message);
    }
}