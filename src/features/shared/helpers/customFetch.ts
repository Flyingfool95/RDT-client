export async function customFetch<T = unknown>(
    endpoint: string,
    method: string = "GET",
    credentials: boolean = false,
    data?: unknown,
    enableRefetch = true
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

    if (enableRefetch) {
        return fetchWithAuthRetry<T>(url, options);
    } else {
        return fetchJson<T>(url, options);
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

async function fetchJson<T = unknown>(url: string, options: RequestInit): Promise<T> {
    try {
        const res = await fetch(url, options);

        const results = await res.json();
        if (!results.success) throw new Error(`${results.message}: ${results.errors.join(", ")}`);
        return results;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export async function fetchWithAuthRetry<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const baseOptions: RequestInit = {
        ...options,
        credentials: options.credentials ?? "include",
        headers: {
            ...(options.headers || {}),
        },
        signal: controller.signal,
    };

    try {
        let results: any = await fetchJson(url, baseOptions);

        if (!results.success && results.errors?.[0] === "Invalid access token") {
            const refreshController = new AbortController();
            const refreshTimeout = setTimeout(() => refreshController.abort(), 7000);
            try {
                const refreshJson: any = await fetchJson(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-tokens`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        signal: refreshController.signal,
                    }
                );

                if (!refreshJson.success) {
                    throw new Error(refreshJson.errors.join(", "));
                }

                results = await fetchJson(url, baseOptions);
            } finally {
                clearTimeout(refreshTimeout);
            }
        }

        if (!results.success) {
            throw new Error(results.errors?.join(", ") || "Unknown error");
        }

        return results as T;
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    } finally {
        clearTimeout(timeoutId);
    }
}
