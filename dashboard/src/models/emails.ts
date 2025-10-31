export interface MailData {
  mailContent: {
    subject: string;
    content: string;
  };
  extraEmailsToSend: string[] | [];
  excludedMails: string[];
}

export interface EmailLists {
  _id: string;
  email: string;
}
