export function arrayToBlobUrl(array: Uint8Array) {
    const pixelArray = new Uint8Array(Object.values(array) as number[]);
    const blob = new Blob([pixelArray], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}

import imageCompression from "browser-image-compression";

export default async function optimizeImage(image: File) {
    const options = {
        maxWidthOrHeight: 200,
        useWebWorker: true,
    };
    const optmizedImage = await imageCompression(image, options);
    return optmizedImage;
}
