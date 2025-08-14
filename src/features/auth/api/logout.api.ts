export default async function logout() {
    const response: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    return result;
}
