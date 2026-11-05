import { NextResponse } from "next/server";
import { events } from "@/data/events";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}