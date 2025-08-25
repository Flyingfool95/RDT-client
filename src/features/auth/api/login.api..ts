import { ApiError } from "../../../classes/ApiError.class";

export default async function login(formData: any) {
    const response: Response = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!result.success) throw new ApiError("Login failed", result.status, result.errors);
    return result;
}
