import { APIError } from "../../../classes/apiError";
import refreshTokens from "../../auth/api/refreshTokens.api";

export default async function deleteProfileImage(formData: any, retries = 1) {
    const response: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/profile/delete-profile-image`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!result.success && result.errors?.[0]?.message === "Invalid access token" && retries > 0) {
        await refreshTokens();
        return deleteProfileImage(formData, retries - 1);
    }

    if (!result.success) throw new APIError("Update failed", result.errors, result.status);
    return result;
}
