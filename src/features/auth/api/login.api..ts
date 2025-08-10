export default async function login(formData: any) {
    let result: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    result = await result.json();

    if (!result.success) throw new Error(result.errors[0].message);

    return result.data;
}
