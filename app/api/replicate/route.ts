import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: Request) {
  // 1. Get request data (in JSON format) from the client
  const req = await request.json();

  // 2. Initialize the replicate object with our Replicate API token
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
  });

  // 3. Set the model that we're about to run
  const model =
    "lucataco/sdxl-controlnet:db2ffdbdc7f6cb4d6dab512434679ee3366ae7ab84f89750f8947d5594b79a47";

  // 4. Set the image which is the image we uploaded from the client
  const input = {
    image: req.image,
    prompt: "a picture of a house at night",
  };

  // 5. Run the Replicate's model (to remove background) and get the output image
  const output = await replicate.run(model, { input });

  // 6. Check if the output is NULL then return err back to the client 
  if (!output) {
    console.log("Something went wrong");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  // 7. Otherwise, we show output in the console (server-side)
  //  and return the output back to the client
  console.log("Output", output);
  return NextResponse.json({ output }, { status: 201 });
}
