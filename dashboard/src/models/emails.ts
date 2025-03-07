export interface MailData {
  mailContent: {
    subject: string;
    content: string;
  };
  extraEmailsToSend: string[] | [];
}
