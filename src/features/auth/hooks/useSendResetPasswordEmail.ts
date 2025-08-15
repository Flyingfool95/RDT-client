import { useMutation } from "@tanstack/react-query";
import sendResetPasswordEmail from "../api/sendResetEmail.api";
import { useState } from "react";

export default function useSendResetPasswordEmail() {
    const [email, setEmail] = useState<string | null>(null);
    const [isEmailFormError, setIsEmailFormError] = useState<boolean>(false);

    function handleSendEmail(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate({ email });
    }

    const mutation = useMutation({
        mutationFn: sendResetPasswordEmail,
        retry: false,
        onSuccess: () => {
            setEmail(null);
        },

        onError: (error) => {
            console.log(error.errors);
            setIsEmailFormError(true);
        },
    });

    return { setEmail, handleSendEmail, isEmailFormError };
}
