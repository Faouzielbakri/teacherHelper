import fs from "fs";
import { join, extname } from "path";
import { nanoid } from "nanoid";
import crypto from "crypto";

var MP4Box = require("mp4box"); // Or whatever import method you prefer.

const uploadDir = join(process.cwd(), "uploads");

export async function GET() {
  return Response.json({ hello: "world" });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const metadata: { filename: string; hash: string; metadata: any }[] = [];

  try {
    //@ts-expect-error
    for (const [name, file] of formData?.entries()) {
      const uuid = nanoid();
      const extension = extname(file.name); // Get the file extension
      const hash = crypto.createHash("sha256");

      // Read the file data into a Buffer
      const fileData = await file.arrayBuffer();
      const buffer = Buffer.from(fileData);

      hash.update(buffer);
      const fileHash = hash.digest("hex");

      const filePath = join(uploadDir, `${name}_${uuid}${extension}`); // Define the path for the file
      fs.writeFileSync(filePath, Buffer.from(fileData));

      var arrayBuffer = new Uint8Array(fs.readFileSync(filePath)).buffer;

      arrayBuffer.fileStart = 0;

      var mp4boxfile = MP4Box.createFile();
      var mp4boxfile = MP4Box.createFile();

      mp4boxfile.onReady = function (info) {
        const { created, duration, tracks } = info;
        const dimentions = tracks[0].video;
        const codec = tracks[0].codec;
        metadata.push({
          filename: `${name}_${uuid}${extension}`,
          hash: fileHash,
          metadata: {
            created,
            uploaded: new Date(),
            duration,
            dimentions,
            codec,
          },
        });
      };

      mp4boxfile.appendBuffer(arrayBuffer);
      mp4boxfile.flush();

      console.log(`File saved: ${name}`);
    }
    console.log(metadata);
    return new Response("Videos uploaded successfully.");
  } catch (error) {
    console.error("Error uploading videos:", error);
    return new Response("VFailed to upload videos.", {
      status: 500,
    });
  }
}

async function extractMetadata(filepath: string) {}
