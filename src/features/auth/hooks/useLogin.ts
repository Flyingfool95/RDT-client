import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import login from "../api/login.api.";
import type { ApiErrorType } from "../../../classes/ApiError.class";

export default function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Array<{ message: string; path: string }> | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            {
                email,
                password,
            },
            {
                onSuccess: (result) => {
                    queryClient.setQueryData(["current-user"], result);
                    navigate("/");
                },

                onError: (error: Error) => {
                    const apiError = error as ApiErrorType;
                    console.error(apiError);
                    setFormErrors(apiError.errors);
                },
            }
        );
    };

    const mutation = useMutation({
        mutationFn: login,
        retry: false,
    });

    return { handleSubmit, setEmail, setPassword, formErrors };
}
