import { useMutation } from "@tanstack/react-query";
import register from "../api/register.api";

export default function useRegister() {
    const mutation = useMutation({
        mutationFn: register,
        retry: false,
    });

    return {
        mutation,
    };
}
