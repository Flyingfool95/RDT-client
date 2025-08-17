import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import sendResetPasswordEmail from "../api/sendResetEmail.api";

export default function useSendResetPasswordEmail() {
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
        },

        onError: (error) => {
            console.log(error);
        },
    });

    return { setEmail, handleSendEmail, formErrors };
}
