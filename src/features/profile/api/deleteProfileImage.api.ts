import { APIError } from "../../../classes/apiError";

export default async function deleteProfileImage(formData: any) {
    const response: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/profile/delete-profile-image`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const result = await response.json();

    console.log(result);

    if (!result.success) throw new APIError("Update failed", result.errors, result.status);
    return result;
}
