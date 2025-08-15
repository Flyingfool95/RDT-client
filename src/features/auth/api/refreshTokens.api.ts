export default async function refreshTokens() {
    const response = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/refresh-tokens`, {
        method: "GET",
        credentials: "include",
    });
    const result = await response.json();
    return result;
}
