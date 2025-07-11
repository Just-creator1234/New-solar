// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getPaginatedPosts } from "@/lib/getPaginatedPosts";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;

  const data = await getPaginatedPosts(page);
  return NextResponse.json(data);
}
