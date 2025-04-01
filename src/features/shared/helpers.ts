export async function useFetch(endpoint: string, method: string = "GET", credentials: boolean = false, data?: unknown) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL + endpoint}`, {
        method: method.toUpperCase(),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: credentials ? "include" : "same-origin",
        body: JSON.stringify(data),
    });

    console.log(response);

    const results = await response.json();

    if (!results.success) {
        console.log(results);
        throw new Error(results.errors);
    }

    return results;
}
