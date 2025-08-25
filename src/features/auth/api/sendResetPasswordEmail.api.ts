import { ApiError } from "../../../classes/ApiError.class";

type SendResetPasswordFormData = {
    email: string;
};

export default async function sendResetPasswordEmail(formData: SendResetPasswordFormData) {
    const response: Response = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/send-reset-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!result.success) throw new ApiError("Sending failed", result.status, result.errors);
    return result;
}
