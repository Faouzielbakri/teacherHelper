import fs from "fs";
import { join, extname } from "path";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { readDatabase } from "@/app/utils";

var MP4Box = require("mp4box"); // Or whatever import method you prefer.

const uploadDir = join(process.cwd(), "/database/videos.json");

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const formData = await request.json(); // returns a Promise of FormData object
  //   const data = Object.fromEntries(formData.entries()); // convert to object

  //   console.log(data);

  return new Response(JSON.stringify(formData));
}
