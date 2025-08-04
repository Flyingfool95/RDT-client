import imageCompression from "browser-image-compression";

export async function convertPixelDataToImage(pixeldata: any) {
    const pixelValues = Object.values(pixeldata);
    const pixelArray = new Uint8Array(pixelValues as any);

    const blob = new Blob([pixelArray], { type: "iamge/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
}

export async function optimizeImage(imageData: File) {
    const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 320,
        useWebWorker: true,
    };
    try {
        return (await imageCompression(imageData, options)) as Blob | MediaSource;
    } catch (error) {
        console.log(error);
        return imageData;
    }
}

export function getFilteredFormData(formData: FormData): FormData {
    const filteredFormData = new FormData();

    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            if (value.name) {
                filteredFormData.append(key, value);
            }
        } else if (typeof value === "string" && value.trim() !== "") {
            filteredFormData.append(key, value.trim());
        }
    }

    const entriesArray = Array.from(filteredFormData.entries());
    if (entriesArray.length === 0) {
        throw new Error("No valid fields provided to update");
    }

    return filteredFormData;
}

export function toCamelCase(label: string): string {
    return label
        .toLowerCase()
        .split(" ")
        .map((word, index) => (index === 0 ? word : word[0].toUpperCase() + word.slice(1)))
        .join("");
}
