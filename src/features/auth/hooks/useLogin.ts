import { useMutation } from "@tanstack/react-query";
import login from "../api/login.api.";

export default function useLogin() {
    const loginUser = useMutation({
        mutationFn: login,
        retry: false,
    });

    return {
        loginUser,
    };
}
