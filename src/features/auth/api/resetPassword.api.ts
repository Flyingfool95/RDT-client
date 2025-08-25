import { ApiError } from "../../../classes/ApiError.class";

type ResetPasswordFormData = {
    password: string;
};

export default async function resetPassword(formData: ResetPasswordFormData) {
    const response: Response = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!result.success) throw new ApiError("Sending failed", result.status, result.errors);
    return result;
}
