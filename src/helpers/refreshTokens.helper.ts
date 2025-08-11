export default async function refreshTokens() {
    console.log("Refreshtokens ran");

    let result = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/refresh-tokens`, {
        method: "GET",
        credentials: "include",
    });

    result = await result.json();
    return result;
}
