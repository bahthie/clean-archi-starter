
export interface EmailDto {
    emailsTo: string[];
    emailSubject: string;
    emailContent: string;
}

export default class EmailSenderService{

    async sendEmail(emaildto: EmailDto): Promise<void> {
        emaildto.emailsTo.map(async (mailTo) => {
            const email = new EmailTemplate(mailTo, emaildto.emailSubject, emaildto.emailContent);
            await email.sendEmail();
        })
    }
}