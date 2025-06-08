import { ZodSchema, ZodType } from "zod";
import imageCompression from "browser-image-compression";

export function validateInputData(schema: ZodSchema, data: unknown) {
    const results = schema.safeParse(data);

    if (!results.success) {
        throw new Error(results.error.issues.map((err) => err.message).join("\n"));
    }

    return results.data;
}

export function zodValidator(schema: ZodType, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const results = schema.safeParse(rawData);

    if (results.success) {
        return { success: true, data: formData };
    } else {
        return {
            success: false,
            errors: results.error.flatten(),
        };
    }
}

export async function convertPixelDataToImage(pixeldata: any) {
    const pixelValues = Object.values(pixeldata);
    const pixelArray = new Uint8Array(pixelValues as any);

    const blob = new Blob([pixelArray], { type: "iamge/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
}

export async function optimizeImage(imageData: any) {
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
