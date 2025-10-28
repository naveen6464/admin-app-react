import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { hostConfig } from "../config";
import { Buffer } from "buffer";
window.Buffer = window.Buffer || require("buffer").Buffer;

const uploadImageToS3 = async (inputBase64, folder, fileName) => {
  const credentials = fromCognitoIdentityPool({
    clientConfig: { region: hostConfig.AWS_REGION },
    identityPoolId: hostConfig.IDENTITY_POOL_ID,
  });
  console.log(hostConfig.IDENTITY_POOL_ID, "credentials");

  const s3 = new S3Client({
    region: hostConfig.AWS_REGION,
    credentials,
  });

  const base64Data = Buffer.from(
    inputBase64?.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const bucket =
    folder === "events" ? hostConfig.EVENT_S3_BUCKET : hostConfig.S3_BUCKET;

  const params = {
    Key: `${folder}/${fileName}.jpg`, // folder in Key, not Bucket
    Bucket: bucket,                   // only bucket name, no slash
    Body: base64Data,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read-write",
  };
  console.log(params, "params");

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    // Construct the public URL (assuming standard S3 public access)
    return `https://${bucket}.s3.${hostConfig.AWS_REGION}.amazonaws.com/${folder}/${fileName}.jpg`;
  } catch (error) {
    console.log(error);
  }
};

export { uploadImageToS3 };
