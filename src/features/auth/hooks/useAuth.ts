import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    sendResetEmailSchema,
    updateUserSchema,
} from "../../../../zod/auth";
import { validateInputData } from "../../../../helpers/auth";

import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../../notifications/store/useNotificationStore";

export default function useAuth() {
    const { addNotification } = useNotificationStore((state) => state);
    const { user, setUser } = useAuthStore((state) => state);

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
            const validatedInputData = validateInputData(registerSchema, { email, password, confirmPassword });

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validatedInputData),
            });

            const results = await response.json();

            if (response.status >= 400) {
                throw new Error(results.errors);
            }

            return results;
        },
        onSuccess: (results) => {
            addNotification({ message: results.message, type: "success" });
            navigate("/login");
        },
        onError: (error) => {
            console.log(error);
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const loginUser = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const validatedInputData = validateInputData(loginSchema, { email, password });

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(validatedInputData),
            });

            const results = await response.json();

            if (response.status >= 400) {
                console.log(results);
                throw new Error(results.errors);
            }

            return results;
        },
        onSuccess: (results) => {
            setUser(results.data);
            addNotification({ message: results.message, type: "success" });
            navigate("/");
        },
        onError: (error) => {
            console.log(error);

            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const updateUser = useMutation({
        mutationFn: async (updateData: {
            currentPassword?: string;
            newPassword?: string;
            email?: string;
            name?: string;
        }) => {
            const validatedInputData = validateInputData(updateUserSchema, updateData);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(validatedInputData),
            });

            const results = await response.json();

            if (response.status >= 400) {
                console.log(results);
                throw new Error(results.errors);
            }

            return results;
        },
        onSuccess: (results) => {
            setUser(results.data);
            addNotification({ message: results.message, type: "success" });
        },
        onError: (error) => {
            addNotification({
                message: error.message,
                type: "error",
                duration: 7000,
            });
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
                method: "GET",
                credentials: "include",
            });

            const results = await response.json();

            if (response.status >= 400) {
                console.log(results);
                throw new Error(results.errors);
            }

            return results;
        },
        onSuccess: (results) => {
            setUser(null);
            addNotification({ message: results.message, type: "info" });
            navigate("/login");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const deleteUser = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("User does not exist");

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: user.id }),
            });

            const results = await response.json();

            if (response.status >= 400) {
                console.log(results);
                throw new Error(results.errors);
            }

            return results;
        },
        onSuccess: (results) => {
            setUser(null);
            addNotification({ message: results.message, type: "success" });
            navigate("/login");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const resetPassword = useMutation({
        mutationFn: async ({ token, password }: { token: string; password: string }) => {
            console.log(token);
            console.log(password);
            const validatedInputData = validateInputData(resetPasswordSchema, { token, password });
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(validatedInputData),
            });

            const results = await response.json();

            if (response.status >= 400) {
                console.log(results);
                throw new Error(results.errors);
            }

            console.log(results);
        },
        onSuccess: (results: any) => {
            addNotification({ message: results.message, type: "success" });
            navigate("/login");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const sendResetEmail = useMutation({
        mutationFn: async (email: string) => {
            const validatedInputData = validateInputData(sendResetEmailSchema, email);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/send-reset-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(validatedInputData),
            });

            const results = await response.json();

            if (response.status >= 400) {
                console.log(results);
                throw new Error(results.errors);
            }

            console.log(results);
        },
        onSuccess: (results: any) => {
            addNotification({ message: results.message, type: "success" });
            navigate("/login");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    return {
        registerUser,
        loginUser,
        updateUser,
        logoutUser,
        deleteUser,
        resetPassword,
        sendResetEmail,
    };
}
