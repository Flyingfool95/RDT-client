import { ZodSchema, ZodType } from "zod";
import imageCompression from "browser-image-compression";

export async function customFetch<T = unknown>(
    endpoint: string,
    method: string = "GET",
    credentials: boolean = false,
    data?: unknown
): Promise<T> {
    const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

    const options: RequestInit = {
        method: method.toUpperCase(),
        credentials: credentials ? "include" : "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    return fetchWithAuthRetry<T>(url, options);
}

export async function customFetchFormData<T = unknown>(
    endpoint: string,
    method: string = "POST",
    credentials: boolean = false,
    formData: FormData
): Promise<T> {
    const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

    const options: RequestInit = {
        method: method.toUpperCase(),
        credentials: credentials ? "include" : "same-origin",
        body: formData,
    };

    return fetchWithAuthRetry<T>(url, options);
}

async function fetchJson(url: string, options: RequestInit) {
    const res = await fetch(url, options);
    try {
        return await res.json();
    } catch {
        throw new Error("Failed to parse JSON response");
    }
}
export async function fetchWithAuthRetry<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const baseOptions: RequestInit = {
        ...options,
        credentials: options.credentials ?? "include",
        headers: {
            ...(options.headers || {}),
        },
        signal: controller.signal,
    };

    try {
        let result: any = await fetchJson(url, baseOptions);

        if (!result.success && result.errors?.[0] === "Invalid access token") {
            // Refresh tokens with a new AbortController
            const refreshController = new AbortController();
            const refreshTimeout = setTimeout(() => refreshController.abort(), 3000);
            try {
                const refreshJson = await fetchJson(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-tokens`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    signal: refreshController.signal,
                });

                if (!refreshJson.success) {
                    throw new Error(refreshJson.errors.join(", "));
                }

                result = await fetchJson(url, baseOptions);
            } finally {
                clearTimeout(refreshTimeout);
            }
        }

        if (!result.success) {
            throw new Error(result.errors?.join(", ") || "Unknown error");
        }

        return result as T;
    } catch (error) {
        console.error("fetchWithAuthRetry error:", error.message);
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

export function validateInputData(schema: ZodSchema, data: unknown) {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new Error(result.error.issues.map((err) => err.message).join("\n"));
    }

    return result.data;
}

export function zodValidator(schema: ZodType, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const result = schema.safeParse(rawData);

    if (result.success) {
        return { success: true, data: formData };
    } else {
        return {
            success: false,
            errors: result.error.flatten(),
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
