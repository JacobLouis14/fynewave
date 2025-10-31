"use client";
import { Article, ArticleModel } from "@/models/article";
import { useSession } from "next-auth/react";
import React from "react";
import UpdateBtn from "./updateBtn";
import ProceedToPublishBtn from "./proceedPublishBtn";
import DraftBtn from "./draftBtn";
import PublishBtn from "./publishBtn";
import RequestPublishBtn from "./requestPublishBtn";
import SchedulePublishBtn from "./schedulePublishBtn";

interface Props {
  articleData?: ArticleModel;
  articleToUpdate?: Article | null;
}

const getButtonConfig = (
  role: string | undefined,
  articleData: ArticleModel,
  articleToUpdate?: Article | null
) => {
  const isAdmin = role === "super_admin" || role === "admin";
  const isWriter = !isAdmin;

  const isPublished = articleToUpdate?.status === "published";
  const isDraft = articleData.status === "draft";
  const isPending = articleData.status === "pending";

  const buttonConfig = {
    adminPublished: isAdmin && isPublished,
    adminDraft: isAdmin && isDraft,
    writerUpdate: isWriter && articleData.status !== "published",
    pendingAdmin: isAdmin && isPending,
    writerForm: isWriter && !articleToUpdate,
  };

  return buttonConfig;
};

const ArticleButtonWrapper = ({ articleData, articleToUpdate }: Props) => {
  const session = useSession();
  const userRole = session.data?.user.role;

  // Return null early if there is no article data
  if (!articleData) return null;

  const buttonConfig = getButtonConfig(userRole, articleData, articleToUpdate);

  if (articleToUpdate) {
    return (
      <div className="grid grid-cols-2 gap-3 justify-between">
        {/* Admin can update published article */}
        {buttonConfig.adminPublished && (
          <UpdateBtn
            articleData={articleData}
            articleToUpdate={articleToUpdate}
          />
        )}

        {/* Admin can update draft and proceed to publish */}
        {buttonConfig.adminDraft && (
          <>
            <UpdateBtn
              articleData={articleData}
              articleToUpdate={articleToUpdate}
            />
            <SchedulePublishBtn articleData={articleData} />
            <ProceedToPublishBtn articleData={articleData} />
          </>
        )}

        {/* Writers can update their articles (draft, pending) */}
        {buttonConfig.writerUpdate && (
          <>
            <UpdateBtn
              articleData={articleData}
              articleToUpdate={articleToUpdate}
            />
            <RequestPublishBtn
              articleData={articleData}
              articleToUpdate={articleToUpdate}
            />
          </>
        )}

        {/* Pending articles submitted by the user and edited by admin */}
        {buttonConfig.pendingAdmin && (
          <>
            <PublishBtn articleData={articleData} />
            <SchedulePublishBtn articleData={articleData} />
          </>
        )}
      </div>
    );
  }

  // No articleToUpdate, just show buttons based on user role and article status
  return (
    <div className="grid grid-cols-2 gap-3 justify-between">
      {buttonConfig.writerForm ? (
        <>
          <DraftBtn articleData={articleData} />
          <RequestPublishBtn articleData={articleData} />
        </>
      ) : (
        <>
          <DraftBtn articleData={articleData} />
          <PublishBtn articleData={articleData} />
        </>
      )}
    </div>
  );
};

export default ArticleButtonWrapper;
