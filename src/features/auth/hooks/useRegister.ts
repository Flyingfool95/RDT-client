import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import register from "../api/register.api";

export default function useRegister() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState<Array<{ message: string; path: string }> | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            {
                email,
                password,
                confirmPassword,
            },
            {
                onSuccess: () => {
                    navigate("/login");
                },

                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    const mutation = useMutation({
        mutationFn: register,
        retry: false,
    });

    return {
        setEmail,
        setPassword,
        setConfirmPassword,
        handleSubmit,
        formErrors,
    };
}
