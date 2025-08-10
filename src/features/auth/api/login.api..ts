export default async function login(formData: any) {
    try {
        let result = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        result = await result.json();

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
