export function getStubImage(prompt: string): string {
    // Return a deterministic placeholder based on prompt length or hash
    // Or just a nice Unsplash placeholder
    const keywords = prompt.split(" ").slice(0, 2).join(",");
    return `https://source.unsplash.com/800x600/?fitness,${keywords}`;
}
