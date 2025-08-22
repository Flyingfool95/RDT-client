import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import sendResetPasswordEmail from "../api/sendResetPasswordEmail.api";
import type { ApiErrorType } from "../../../classes/ApiError.class";

export default function useSendResetPasswordEmail() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Array<{ message: string; path: string }> | null>(null);

    function handleSendEmail(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate({ email });
    }

    const mutation = useMutation({
        mutationFn: sendResetPasswordEmail,
        retry: false,
        onSuccess: () => {
            setEmail(null);
            navigate("/login")
        },

        onError: (error: Error) => {
            const apiError = error as ApiErrorType;
            console.error(apiError);
            setFormErrors(apiError.errors);
        },
    });

    return { setEmail, handleSendEmail, formErrors };
}
