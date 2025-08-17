import { useMutation } from "@tanstack/react-query";
import register from "../api/register.api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function useRegister() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState<Array<{ message: string; path: string }> | null>(null);

    function getInputData() {
        return {
            email,
            password,
            confirmPassword,
        };
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(getInputData(), {
            onSuccess: () => {
                navigate("/login");
            },

            onError: (error) => {
                console.log(error);
            },
        });
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
