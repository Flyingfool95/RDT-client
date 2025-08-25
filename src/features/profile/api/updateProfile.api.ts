import { ApiError } from "../../../classes/ApiError.class";
import refreshTokens from "../../auth/api/refreshTokens.api";

export default async function updateProfile(formData: any, retries = 1) {
    const response: Response = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/profile/update`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
    });

    const result = await response.json();

    if (!result.success && result.errors?.[0]?.message === "Invalid access token" && retries > 0) {
        await refreshTokens();
        return updateProfile(formData, retries - 1);
    }

    if (!result.success) throw new ApiError("Update failed", result.status, result.errors);
    return result;
}
