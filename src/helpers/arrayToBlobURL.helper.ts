export function arrayToBlobUrl(array: Uint8Array) {
    const pixelArray = new Uint8Array(Object.values(array) as number[]);
    const blob = new Blob([pixelArray], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}
