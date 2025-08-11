import { useMutation } from "@tanstack/react-query";
import register from "../api/register.api";

export default function useRegister() {
    const registerUser = useMutation({
        mutationFn: register,
        retry: false,
    });

    return {
        registerUser,
    };
}
