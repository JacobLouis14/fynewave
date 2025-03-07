"use client";
import React, { useCallback, useRef, useState } from "react";
import { MailData } from "@/models/emails";
import { toast } from "react-toastify";
import { sendEmailAction } from "@/actions/sActions";

const EmailPage = () => {
  const [emailData, setEmailData] = useState<MailData>({
    mailContent: {
      subject: "",
      content: "",
    },
    extraEmailsToSend: [],
  });
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
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
      const { data, error } = await sendEmailAction(emailData);
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
      });
      setIsEmailSending(false);
    }
  };

  return (
    <div className="px-3 py-4 grid grid-cols-1 md:grid-cols-12 gap-4">
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
