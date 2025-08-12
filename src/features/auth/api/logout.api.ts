export default async function logout() {
    console.log("ran logout");
    let result: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return result;
}
