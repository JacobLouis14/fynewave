const {
  S3Client,
  CopyObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// s3 bucket initialization
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
  },
});

// get signed url
const getBucketImageUrl = async (pathValueAndKey) => {
  try {
    const imageParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: pathValueAndKey,
    };

    const getImageCommand = new GetObjectCommand(imageParams);

    const imageUrl = await getSignedUrl(
      s3,
      getImageCommand
      // { expiresIn: 3600,}
    );
    return imageUrl;
  } catch (error) {
    throw new Error(`error in getting image url form bucket error: ${error}`);
  }
};

////////////////////////////////////to upload imnages to s3
const uploadImagesToS3Bucket = async (slug, thumbnail, banner) => {
  try {
    const { thumbnailName } = await uploadThumbnailToBucket(slug, thumbnail);
    const { bannerName } = await uploadBannerToBucket(slug, banner);

    return {
      thumbnailName,
      bannerName,
    };
  } catch (error) {
    throw new Error(`error in uploading file in aws error: ${error}`);
  }
};

// upload thumbnail to bucket
const uploadThumbnailToBucket = async (slug, thumbnail) => {
  try {
    // for thumbnail
    const thumbnailName = `articles/${slug}/${slug}-thumbnail`;
    const tumbnailParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: thumbnailName,
      Body: thumbnail[0].buffer,
      ContentType: thumbnail[0].mimetype,
    };
    const thumbnailCommand = new PutObjectCommand(tumbnailParams);

    // uploading command for s3
    await s3.send(thumbnailCommand);
    return { thumbnailName };
  } catch (error) {
    throw new Error(`error in uploading thumbnail file in aws error: ${error}`);
  }
};

// upload banner to bucket
const uploadBannerToBucket = async (slug, banner) => {
  try {
    // for banner
    const bannerName = `articles/${slug}/${slug}-banner`;
    const bannerParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: bannerName,
      Body: banner[0].buffer,
      ContentType: banner[0].mimetype,
    };
    const bannerCommand = new PutObjectCommand(bannerParams);
    await s3.send(bannerCommand);

    return { bannerName };
  } catch (error) {
    throw new Error(`error in uploading banner file in aws error: ${error}`);
  }
};

//////////////////////////////////to delete files from s3
const deleteImagesFromS3Bucket = async (thumbnailKey, bannerKey) => {
  try {
    await deleteThumbnailFromBucket(thumbnailKey);
    await deleteBannerFromBucket(bannerKey);
  } catch (error) {
    throw new Error(`error in deleting file in aws error: ${error}`);
  }
};

// delete thumbnail to bucket
const deleteThumbnailFromBucket = async (thumbnailKey) => {
  try {
    // for thumbnail
    const thumbnailParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: thumbnailKey,
    };
    const thumbnailCommand = new DeleteObjectCommand(thumbnailParams);

    // deleting command
    await s3.send(thumbnailCommand);
  } catch (error) {
    throw new Error(`error in deleteing thumbnail file in aws error: ${error}`);
  }
};

// delete banner to bucket
const deleteBannerFromBucket = async (bannerKey) => {
  try {
    // for banner
    const bannerParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: bannerKey,
    };

    const bannerCommand = new DeleteObjectCommand(bannerParams);
    // deleting command
    await s3.send(bannerCommand);
  } catch (error) {
    throw new Error(`error in uploading banner file in aws error: ${error}`);
  }
};

/////////////////////////////////////to copy files to another directory
const copyFileInAws = async (olderPath, newPath) => {
  console.log(olderPath, newPath);

  try {
    const copyObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      CopySource: `${process.env.BUCKET_NAME}/${olderPath}`,
      Key: newPath,
    };
    const copyCommand = new CopyObjectCommand(copyObjectParams);
    await s3.send(copyCommand);
  } catch (error) {
    throw new Error(`error in copying file in aws error: ${error}`);
  }
};

// upload images to bucket
const uploadImagesToBucket = async (pathAndName, imageFile) => {
  try {
    const imageParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: pathAndName,
      Body: imageFile[0].buffer,
      ContentType: imageFile[0].mimetype,
    };
    const imageCommand = new PutObjectCommand(imageParams);
    await s3.send(imageCommand);

    return pathAndName;
  } catch (error) {
    throw new Error(`error in uploading banner file in aws error: ${error}`);
  }
};

// delete image to bucket
const deleteImageFromBucket = async (imageKey) => {
  try {
    // for banner
    const imageParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: imageKey,
    };

    const imageCommand = new DeleteObjectCommand(imageParams);
    // deleting command
    await s3.send(imageCommand);
  } catch (error) {
    throw new Error(`error in uploading banner file in aws error: ${error}`);
  }
};

module.exports = {
  getBucketImageUrl,
  copyFileInAws,
  uploadImagesToS3Bucket,
  uploadBannerToBucket,
  uploadThumbnailToBucket,
  deleteImagesFromS3Bucket,
  deleteBannerFromBucket,
  deleteThumbnailFromBucket,
  uploadImagesToBucket,
  deleteImageFromBucket,
};
