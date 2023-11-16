import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

//declare the pinecode variable
let pinecone: Pinecone | null = null;

export const getPinecode = async () => {
  //if pinecode does not exist we create it
  if (!pinecone) {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });
  }
  return pinecone!;
};

//create a function to load s3 into pinecone
export const loadS3IntoPinecone = async (fileKey: string) => {
  //step 1 => obtain the PDF => download and read the PDF  from s3.
  console.log("downloading s3 into file system");
  const file_name = await downloadFromS3(fileKey);

  //step 2 => we need to be able to read the text in the PDFs.
  //we will use loader from longchain
  if (!file_name) {
    throw Error("File could not be downloaded from s3");
  }
  let loader = new PDFLoader(file_name);
  //to see the all the pages in the pdf
  const pages = await loader.load();
  return pages;
};
