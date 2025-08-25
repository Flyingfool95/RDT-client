import { ApiError } from "../../../classes/ApiError.class";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default async function register(formData: RegisterFormData) {
    const response: Response = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!result.success) throw new ApiError("Register failed", result.status, result.errors);
    return result;
}
