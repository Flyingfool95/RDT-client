import imageCompression from "browser-image-compression";

export default async function optimizeImage(image: File) {
    const options = {
        maxWidthOrHeight: 200,
        useWebWorker: true,
    };
    const optmizedImage = await imageCompression(image, options);
    return optmizedImage;
}
