import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"; // For converting the buffer into a readable stream

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,      // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req) {
    try {
        const { text, id } = await req.json();

        const request = {
            input: { text },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        // Perform the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // Convert the audio content to a Buffer
        const audioBuffer = Buffer.from(response.audioContent, "binary");

        // Upload the audio buffer to Cloudinary
        const uploadStream = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "raw", public_id: `ai-short-video-files/${id}` },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                // Use streamifier to stream the audio buffer
                streamifier.createReadStream(audioBuffer).pipe(stream);
            });

        const uploadResponse = await uploadStream();

        const downloadUrl = uploadResponse.secure_url; // Get the public URL of the file
        console.log("File available at:", downloadUrl);

        return NextResponse.json({ Result: downloadUrl });
    } catch (error) {
        console.error("Error in generating audio:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
