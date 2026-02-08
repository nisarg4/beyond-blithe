import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    revalidateTag(body._type, { expire: 0 });

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
