import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { IUser } from "../../../../types/auth";
import { loginSchema, registerSchema } from "../../../../zod/auth";
import { validateInputData } from "../../../../helpers/auth";

import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../../notifications/store/useNotificationStore";

export default function useAuth() {
    const { addNotification } = useNotificationStore((state) => state);
    const { setUser } = useAuthStore((state) => state);

    const navigate = useNavigate();

    const registerUser = useMutation({
        mutationFn: async ({
            email,
            password,
            confirmPassword,
        }: {
            email: string;
            password: string;
            confirmPassword: string;
        }) => {
            const result = validateInputData(registerSchema, { email, password, confirmPassword });

            const response = await fetch("http://localhost:8000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            });

            if (response.status >= 400) {
                throw new Error(`Something went wrong. Error code: ${response.status}`);
            }

            const data = response.json();

            addNotification({ message: "User registered", type: "success", duration: 5000 });

            return data;
        },
        onSuccess: (data: IUser) => {
            console.log(data);
            navigate("/login");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const loginUser = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const validatedData = validateInputData(loginSchema, { email, password });

            const results = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(validatedData),
            });

            if (results.status >= 400) {
                throw new Error(`Something went wrong. Error code: ${results.status}`);
            }
            const data = await results.json();

            addNotification({ message: "Logged in", type: "success", duration: 5000 });

            return data.data;
        },
        onSuccess: (data: IUser) => {
            setUser(data);
            navigate("/");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    async function updateUser() {
        // Update logic
    }

    async function logoutUser() {
        const results = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
            method: "GET",
            credentials: "include",
        });

        if (results.status >= 400) {
            throw new Error(`Something went wrong. Error code: ${results.status}`);
        }

        setUser(null);
        addNotification({ message: "Logged out", type: "info", duration: 5000 });
    }
    async function deleteUser() {
        // Delete user
    }

    return {
        registerUser,
        loginUser,
        updateUser,
        logoutUser,
        deleteUser,
    };
}
