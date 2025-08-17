
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
    if (!result.success) throw new Error("Sending email failed");
    return result;
}
