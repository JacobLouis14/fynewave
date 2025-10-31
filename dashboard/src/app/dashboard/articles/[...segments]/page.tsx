import { getArticleById } from "@/actions/sActions";
import ProceedToPublishBtn from "@/components/articles/buttons/proceedPublishBtn";
import SchedulePublishBtn from "@/components/articles/buttons/schedulePublishBtn";
import InstagramEmbedd from "@/components/articles/instagramEmbed";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    segments: string[];
  };
};

const ArticleDetails = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const isView = params.segments[0] === "view";
  const articleId = isView ? params.segments[1] : params.segments[0];

  const {
    data: article,
    isLoading,
    error,
  } = await getArticleById(articleId, session?.user.token || "");

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>something went wrong</p>;
  }

  return (
    <div className="grid grid-cols-8 gap-3 h-[90vh] px-4 py-2 overflow-auto">
      <div className="col-span-6 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Title</h6>
          <p>{article?.title}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Description</h6>
          <p>{article?.desc}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Article Content One</h6>
          <p>{article?.articleContentOne}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Article Content Two</h6>
          <p>{article?.articleContentThree}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Article Content Three</h6>
          <p>{article?.articleContentThree}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Tags</h6>
          <div className="flex gap-2">
            {article?.tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <h6 className="text-xl font-semibold">Category</h6>
            <p>{article?.category}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h6 className="text-xl font-semibold">Author</h6>
            <p>{article?.author.name}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {article?.articleContentImageUrl && (
            <div className="flex flex-col gap-3">
              <h6 className="text-xl font-semibold">Content Image</h6>
              <div className="relative">
                <Image
                  src={article?.articleContentImageUrl || ""}
                  alt="content image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          )}
          {article?.articleContentInstagram && (
            <div className="flex flex-col gap-3">
              <h6 className="text-xl font-semibold">Instagram Embed</h6>
              <InstagramEmbedd embeddCode={article?.articleContentInstagram} />
            </div>
          )}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Thumbnail</h6>
          <div className="relative">
            <Image
              src={article?.thumbnailUrl || ""}
              alt="thumbnail"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-xl font-semibold">Banner</h6>
          <div className="relative">
            <Image
              src={article?.bannerUrl || ""}
              alt="thumbnail"
              width={200}
              height={200}
            />
          </div>
        </div>
        {article?.videoIframes && article?.videoIframes?.length > 0 && (
          <div className="flex flex-col gap-3">
            <h6 className="text-xl font-semibold">Video Iframes</h6>
            <div className="flex flex-col pt-3 gap-2">
              {article?.videoIframes.map((frames, index) => (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: frames }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {article?.songsIframes && article?.songsIframes.length > 0 && (
          <div className="flex flex-col gap-3">
            <h6 className="text-xl font-semibold">Songs Iframes</h6>
            {article?.songsIframes.map((frames, index) => (
              <div key={index}>
                <div dangerouslySetInnerHTML={{ __html: frames }} />
              </div>
            ))}
          </div>
        )}
        {!isView && (
          <div className="flex flex-col gap-2">
            <SchedulePublishBtn articleData={article} />
            {article && <ProceedToPublishBtn articleData={article} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetails;
