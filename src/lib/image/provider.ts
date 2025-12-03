import Replicate from "replicate";

export async function generateImage(prompt: string): Promise<string> {
    if (!process.env.REPLICATE_API_KEY) {
        throw new Error("Missing Replicate API Key");
    }

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY,
    });

    const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
            input: {
                prompt,
                width: 768,
                height: 768,
                refine: "expert_ensemble_refiner",
            }
        }
    );

    // Replicate returns an array of URLs usually
    if (Array.isArray(output) && output.length > 0) {
        return output[0] as string;
    }

    return output as unknown as string;
}
