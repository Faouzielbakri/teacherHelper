import fs from "fs";
import { join, extname } from "path";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { readDatabase } from "@/app/utils";

var MP4Box = require("mp4box"); // Or whatever import method you prefer.

const uploadDir = join(process.cwd(), "/database/videos.json");

export async function GET(request: Request) {
  const { hash } = request.query;
  try {
    const database = readDatabase();
    const video = database.find((v) => v.hash === hash);
    return new Response(video, {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting video:", error);
    return new Response("Error getting video", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {}
