import { useMutation, useQueryClient } from "@tanstack/react-query";
import login from "../api/login.api.";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [isFormError, setIsFormError] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: login,
        retry: false,
    });

    const getInputData = () => ({
        email,
        password,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(getInputData(), {
            onSuccess: (result) => {
                queryClient.setQueryData(["current-user"], result);
                navigate("/");
            },

            onError: (error: any) => {
                console.log(error);
                setIsFormError(true);
            },
        });
    };

    return { handleSubmit, isFormError, setEmail, setPassword };
}
