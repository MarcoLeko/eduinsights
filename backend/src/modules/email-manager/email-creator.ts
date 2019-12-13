import {inject, injectable} from 'inversify';
import handlebars from 'handlebars';
import fs from 'fs';
import {User, UserToken} from "../../types/types";
import path from 'path';
import {joinDir} from "../utils/paths";
import sendgridMail from '@sendgrid/mail';
import {MailData} from '@sendgrid/helpers/classes/mail';
import {TYPES} from "../../di-config/types";
import MongoDBClient from "../db/mongo-db-client";

@injectable()
export default class EmailCreator {

    private static EMAIL_FROM = 'no-reply@help-educate.com';

    constructor(
        @inject(TYPES.MONGO_DB_CLIENT) private mongoDBClient: MongoDBClient
    ) {
        sendgridMail.setApiKey(process.env.SEND_GRID_API_KEY as string);
    }

    private static transformTemplate(data: Object, path: string): string {
        const html = handlebars.compile(fs.readFileSync(path, 'utf-8'));
        return html(data);
    }

    public async sendEmailVerificationLink(data: any) {
        const {firstName, email, uid} = data;
        const token = Math.random().toString(36).substr(2);

        console.log(token);

        const message: MailData = {
            to: email,
            from: EmailCreator.EMAIL_FROM,
            subject: 'Help-educate Support',
            html: EmailCreator.transformTemplate({
                firstName,
                link: `http://localhost:8080?token=${token}`
            }, path.join(joinDir('src/modules/email-manager/templates/email-verification.html')))
        };

        await sendgridMail.send(message);

        // expires in 7 days from now
        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        return this.mongoDBClient.addEmailVerificationToken({uid, token, expireAt} as UserToken);
    }
}