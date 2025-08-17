import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import resetPassword from "../api/resetPassword.api";

export default function useResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [password, setPassword] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Array<{ message: string; path: string }> | null>(null);

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
        formErrors,
    };
}
