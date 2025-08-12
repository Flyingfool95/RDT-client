import { useMutation } from "@tanstack/react-query";
import resetPassword from "../api/resetPassword.api";

export default function useResetPassword(){
    const mutation = useMutation({
        mutationFn: resetPassword,
        retry: false,
    });

    return {
        mutation,
    };
}