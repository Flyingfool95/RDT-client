import { APIError } from "../../../classes/apiError";

export default async function sendResetPasswordEmail(formData: any) {
    const response: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/send-reset-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!result.success) throw new APIError("Sending email failed", result.errors, result.status);
    return result;
}
