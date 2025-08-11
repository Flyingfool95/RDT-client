import { APIError } from "../../../classes/apiError";

export default async function login(formData: any) {
    let result: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    result = await result.json();

    if (!result.success) throw new APIError("Login failed", result.errors, result.status);

    return result;
}
