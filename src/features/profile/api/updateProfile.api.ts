import { APIError } from "../../../classes/apiError";

export default async function updateProfile(formData: any) {
    const response: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/profile/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!result.success) throw new APIError("Login failed", result.errors, result.status);
    return result;
}
