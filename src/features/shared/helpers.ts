import { ZodSchema } from "zod";

export async function useFetch(endpoint: string, method: string = "GET", credentials: boolean = false, data?: unknown) {
    const isFormData = data instanceof Blob;

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL + endpoint}`, {
        method: method.toUpperCase(),
        headers: isFormData
            ? undefined
            : {
                  "Content-Type": "application/json",
              },
        credentials: credentials ? "include" : "same-origin",
        body: data ? (isFormData ? (data as Blob) : JSON.stringify(data)) : undefined,
    });

    const results = await response.json();

    if (!results.success) {
        throw new Error(results.errors);
    }

    return results;
}

export function validateInputData(schema: ZodSchema, data: unknown) {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new Error(result.error.issues.map((err) => err.message).join("\n"));
    }

    return result.data;
}

export async function convertPixelDataToImage(pixeldata: any) {
    const pixelValues = Object.values(pixeldata);
    const pixelArray = new Uint8Array(pixelValues as any);

    const blob = new Blob([pixelArray], { type: "iamge/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
}
