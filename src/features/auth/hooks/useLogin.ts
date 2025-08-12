import { useMutation } from "@tanstack/react-query";
import login from "../api/login.api.";

export default function useLogin() {
    const mutation = useMutation({
        mutationFn: login,
        retry: false,
    });

    return {
        mutation,
    };
}
