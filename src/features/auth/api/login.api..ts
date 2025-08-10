export default async function login() {
    try {
        let result = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "j@mail.com", password: "123123123" }),
        });

        result = await result.json();

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
