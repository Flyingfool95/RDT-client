export default async function authCheck() {
    try {
        let result = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/auth-check`, {
            credentials: "include",
        });

        return await result.json();
    } catch (error) {
        console.log(error);
    }
}
