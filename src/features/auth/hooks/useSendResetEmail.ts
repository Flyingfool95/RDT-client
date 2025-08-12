import { useMutation } from "@tanstack/react-query";
import sendResetPasswordEmail from "../api/sendResetEmail.api";

export default function useSendResetPasswordEmail() {
    const mutation = useMutation({
        mutationFn: sendResetPasswordEmail,
        retry: false,
    });

    return {
        mutation,
    };
}
