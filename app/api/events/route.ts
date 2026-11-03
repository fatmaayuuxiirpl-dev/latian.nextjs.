import { NextResponse } from "next/server";
import { events } from "@/data/events";

export function GET() {
  return NextResponse.json(events);
}