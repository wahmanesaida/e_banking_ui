

export class MailStructure{
    recipient?:string;
    subject?:string;
    message?:string;

    constructor(
    recipient?:string,
    subject?:string,
    message?:string
    ) {
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
    }


}