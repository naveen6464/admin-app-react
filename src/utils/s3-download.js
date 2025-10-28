import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { hostConfig } from "../config";

const s3 = new S3Client({
  region: hostConfig.AWS_REGION,
  credentials: fromCognitoIdentityPool({
    identityPoolId: hostConfig.IDENTITY_POOL_ID,
    clientConfig: { region: hostConfig.AWS_REGION },
  }),
});

 export async function downloadFile(params) {
  try {
    const command = new GetObjectCommand(params);
    const data = await s3.send(command);

    // Convert stream to blob
    const arrayBuffer = await data.Body.transformToByteArray(); // v3 helper
    const blob = new Blob([arrayBuffer], { type: data.ContentType });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = params.Key.split("/").pop() || "downloaded-file"; // extract filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error downloading file:", err);
  }
}
