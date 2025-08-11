export default async function authCheck() {
    let result: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/auth-check`, {
        method: "GET",
        credentials: "include",
    });

    return await result.json();
}
