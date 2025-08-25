import refreshTokens from "../../auth/api/refreshTokens.api";

type DeleteProfileImageFormData = {
    image: string;
};

export default async function deleteProfileImage(formData: DeleteProfileImageFormData, retries = 1) {
    const response: Response = await fetch(
        import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/profile/delete-profile-image`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
    );

    const result = await response.json();

    if (!result.success && result.errors?.[0]?.message === "Invalid access token" && retries > 0) {
        await refreshTokens();
        return deleteProfileImage(formData, retries - 1);
    }

    if (!result.success) throw new Error("Update failed");
    return result;
}
