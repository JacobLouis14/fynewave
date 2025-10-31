"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { EmailLists, MailData } from "@/models/emails";
import { toast } from "react-toastify";
import { listEmailAction, sendEmailAction } from "@/actions/sActions";
import { useSession } from "next-auth/react";

const EmailPage = () => {
  const session = useSession();
  const [emailData, setEmailData] = useState<MailData>({
    mailContent: {
      subject: "",
      content: "",
    },
    extraEmailsToSend: [],
    excludedMails: [],
  });
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [mailList, setMailList] = useState<EmailLists[]>([]);
  const [isErrorinEmailListing, setIsErrorInEmailListing] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // subject change handler
  const handleChangeSubjectHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailData((prevData) => ({
        ...prevData,
        mailContent: {
          ...prevData.mailContent,
          subject: e.target.value,
        },
      }));
    },
    []
  );

  //   content change handler
  const handleChangeInContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEmailData((prevData) => ({
        ...prevData,
        mailContent: {
          ...prevData.mailContent,
          content: e.target.value,
        },
      }));
    },
    []
  );

  //   adding email to the list
  const addEmailHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnterKey = e.key;
    if (isEnterKey !== "Enter") return;
    const newEmail = e.currentTarget.value;

    setEmailData({
      ...emailData,
      extraEmailsToSend: [...emailData.extraEmailsToSend, newEmail],
    });
    if (emailInputRef.current) {
      emailInputRef.current.value = "";
    }
  };
  //remove email handler
  const removeEmailHandler = useCallback((emailToRemove: string) => {
    setEmailData((prevData) => ({
      ...prevData,
      extraEmailsToSend: prevData.extraEmailsToSend.filter(
        (val) => val !== emailToRemove
      ),
    }));
  }, []);

  //   email sending handler
  const sendEmailHandler = async () => {
    const { mailContent } = emailData;
    if (!mailContent.subject || !mailContent.content)
      return toast.error("need to fill subject and content");

    try {
      setIsEmailSending(true);
      const { data, error } = await sendEmailAction(
        emailData,
        session.data?.user.token || ""
      );
      if (error) return toast.error("error in sending mail");
      if (data.status === 200) return toast.success(data.message);
    } catch (error) {
      console.log("error in sending emails");
    } finally {
      setEmailData({
        mailContent: {
          subject: "",
          content: "",
        },
        extraEmailsToSend: [],
        excludedMails: [],
      });
      setIsEmailSending(false);
      handleMailListing();
    }
  };

  // list mail handler
  const handleMailListing = async () => {
    try {
      const { data, error } = await listEmailAction({
        token: session.data?.user.token || "",
      });
      if (error) {
        console.log(error);

        setIsErrorInEmailListing(true);
        return;
      }
      setMailList(data.emails);
    } catch (error) {
      setIsErrorInEmailListing(true);
    }
  };

  // modify mail list handler
  const modifyMailList = (mail: string) => {
    setEmailData((prev) => {
      return {
        ...prev,
        excludedMails: [...prev.excludedMails, mail],
      };
    });

    setMailList((prev) => prev.filter((pf) => pf.email != mail));
  };

  useEffect(() => {
    if (session.data) {
      handleMailListing();
    }
  }, [session]);

  return (
    <div className="px-3 py-4 grid grid-cols-1 md:grid-cols-12 gap-4 h-[90vh] overflow-auto">
      <div className="flex flex-col gap-5 col-span-8">
        <div className="flex flex-col gap-2">
          <h6 className="font-medium text-2xl">Mail Subject</h6>
          <input
            type="text"
            placeholder="subject of email"
            className="w-full border rounded-md p-2"
            value={emailData?.mailContent.subject}
            onChange={handleChangeSubjectHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-medium text-2xl">Content</h6>
          <textarea
            placeholder="content of email"
            className="border p-3"
            rows={20}
            value={emailData?.mailContent.content}
            onChange={handleChangeInContent}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h6 className="font-medium text-2xl">Mail list</h6>
          <div className="h-[60vh] w-full overflow-auto">
            {isErrorinEmailListing ? (
              <p>something went wrong</p>
            ) : (
              <table className="table-auto border border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border py-2 px-5">Emails</th>
                    <th className="border py-2 px-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mailList.length > 0 ? (
                    mailList.map((mail, index) => (
                      <tr key={index}>
                        <td className="border text-center px-5">
                          {mail.email}
                        </td>
                        <td className="py-2 text-center">
                          <button
                            onClick={() => modifyMailList(mail.email)}
                            className="bg-darkRed px-3 py-1 rounded-sm text-white"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center py-3">
                        No mail data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h6 className="font-medium text-2xl">Add extra emails</h6>
          <input
            type="email"
            placeholder="press enter to add"
            className="w-full border rounded-md p-2"
            onKeyDown={addEmailHandler}
            ref={emailInputRef}
          />
        </div>
        <div className="flex flex-col gap-2 w-full h-96 overflow-y-scroll p-3 bg-white">
          {emailData.extraEmailsToSend &&
          emailData.extraEmailsToSend.length > 0 ? (
            emailData.extraEmailsToSend.map((email, index) => (
              <div
                key={index}
                className="flex justify-between gap-4 border rounded-md px-4 py-3"
              >
                <p className="m-0">{email}</p>
                <button onClick={() => removeEmailHandler(email)}>x</button>
              </div>
            ))
          ) : (
            <p>No extra emails added</p>
          )}
        </div>
        <button
          onClick={sendEmailHandler}
          disabled={isEmailSending}
          className="ms-auto px-4 py-2 bg-darkRed text-white rounded-md cursor-pointer disabled:bg-gray-500 disabled:text-black disabled:cursor-default"
        >
          send mail
        </button>
      </div>
    </div>
  );
};

export default EmailPage;
