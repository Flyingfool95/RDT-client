import { useMutation } from "@tanstack/react-query";
import resetPassword from "../api/resetPassword.api";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function useResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [password, setPassword] = useState<string | null>(null);

    const token = searchParams.get("token");

    function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate(
            { token, password },
            {
                onSuccess: () => {
                    navigate("/login");
                },
                onError: (error) => {
                    console.error(error);
                },
            }
        );
    }
    const mutation = useMutation({
        mutationFn: resetPassword,
        retry: false,
    });

    return {
        token,
        setPassword,
        handleResetPassword,
    };
}
