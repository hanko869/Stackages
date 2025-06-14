import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://api.elevenlabs.io/v1/models";
  const headers = {
    "xi-api-key": process.env.ELEVENLABS_API_TOKEN as string,
  };

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
