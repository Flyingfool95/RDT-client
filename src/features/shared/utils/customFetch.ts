import { RDTResponse } from "../types";

export async function customFetch<T = unknown>(
    endpoint: string,
    method: string = "GET",
    credentials: boolean = false,
    data?: unknown
) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
    const options: RequestInit = {
        method: method.toUpperCase(),
        credentials: credentials ? "include" : "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    };
    let result: RDTResponse | Response | Promise<T>;

    try {
        if (!credentials) {
            result = await fetch(url, options);
            result = (await result.json()) as RDTResponse;
            return result;
        } else {
            return fetchWithAuthRetry<T>(url, options);
        }
    } catch (error) {
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
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

export async function fetchWithAuthRetry<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
    let response = await fetch(url, options);
    let result = await response.json();

    if (!result.success && result.errors?.[0] === "Invalid access token") {
        const refreshURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-tokens`;
        const refreshResponse = await fetch(refreshURL, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        const refreshResult = await refreshResponse.json();

        if (!refreshResult.success) {
            throw new Error("Session expired. Please login again.");
        }

        response = await fetch(url, options);
        result = await response.json();
    }

    return result as T;
}
