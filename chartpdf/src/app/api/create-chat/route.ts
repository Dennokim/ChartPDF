import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

//api/crete-chat POST endpoint route
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    const pages = await loadS3IntoPinecone(file_key)
    return NextResponse.json({ pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
