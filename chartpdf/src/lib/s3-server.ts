import AWS from "aws-sdk";
import fs from "fs"; //we need fs to download the file to our system

//create a function to download the PDF from the s3 to the local computer
export async function downloadFromS3(file_key: string) {
  try {
    //config s3
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: "us-west-2",
    });
    const params = {
      Key: file_key,
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    };

    const obj = await s3.getObject(params).promise();
    //declare where we want the file to be downloaded
    const file_name = `/tmp/pdf-${Date.now()}.pdf`;
    fs.writeFileSync(file_name, obj.Body as Buffer);
    return file_name;
  } catch (error) {
    console.error(error);
    return null;
  }
}
