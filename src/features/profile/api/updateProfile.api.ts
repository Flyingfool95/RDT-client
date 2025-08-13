import { APIError } from "../../../classes/apiError";

export default async function updateProfile(formData: any) {
    const response: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/profile/update`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
    });

    const result = response;
    console.log(result);
    if (!result.success) throw new APIError("Update failed", result.errors, result.status);
    return result;
}
