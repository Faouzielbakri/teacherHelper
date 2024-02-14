import fs from "fs";
import { join, extname } from "path";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { readDatabase, writeDatabase } from "@/app/utils";

var MP4Box = require("mp4box"); // Or whatever import method you prefer.

const uploadDir = join(process.cwd(), "/database/videos.json");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get("hash");

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

export async function POST(request: Request) {
  const data = request.query;
  console.log(data);
  // const database = readDatabase();
  // const existingVideoIndex = database.findIndex((v) => v.hash === data.hash);

  // if (existingVideoIndex === -1) {
  //   // Video with the same hash doesn't exist, so add the new video
  //   database.push(data);
  //   writeDatabase(database);
  //   return Response.json({
  //     success: true,
  //     message: "Video added successfully.",
  //   });
  // } else {
  //   database[existingVideoIndex] = { ...database[existingVideoIndex], ...data };
  //   writeDatabase(database);
  //   return Response.json({
  //     success: true,
  //     message: "Video updated successfully.",
  //   });
  // }
}

export async function DELETE(request: Request) {
  console.log(request.query);

  const { hash } = req.query;
  try {
    const database = readDatabase();
    const filteredDatabase = database.filter((v) => v.hash !== hash);
    writeDatabase(filteredDatabase);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting video:", error);
    return Response.json({ error: "Failed to delete video." });
  }
}
