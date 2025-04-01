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
import { useFetch } from "../../shared/helpers";

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

            const results = await useFetch("/api/v1/auth/register", "POST", false, validatedInputData);

            return results;
        },
        onSuccess: (results) => {
            addNotification(results.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            console.log(error);
            addNotification(error.message, "error", 7000);
        },
    });

    const loginUser = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const validatedInputData = validateInputData(loginSchema, { email, password });

            const results = await useFetch("/api/v1/auth/login", "POST", true, validatedInputData);

            return results;
        },
        onSuccess: (results) => {
            setUser(results.data);
            addNotification(results.message, "success");
            navigate("/");
        },
        onError: (error) => {
            console.log(error);

            addNotification(error.message, "error", 7000);
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

            const results = await useFetch("/api/v1/auth/update", "PUT", true, validatedInputData);

            return results;
        },
        onSuccess: (results) => {
            setUser(results.data);
            addNotification(results.message, "success");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            const results = await useFetch("/api/v1/auth/logout", "GET", true);

            return results;
        },
        onSuccess: (results) => {
            setUser(null);
            addNotification(results.message, "info");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const deleteUser = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("User does not exist");

            const results = await useFetch("/api/v1/auth/delete", "DELETE", true, JSON.stringify({ id: user.id }));

            return results;
        },
        onSuccess: (results) => {
            setUser(null);
            addNotification(results.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const resetPassword = useMutation({
        mutationFn: async ({ token, password }: { token: string; password: string }) => {
            const validatedInputData = validateInputData(resetPasswordSchema, { token, password });

            const results = await useFetch("/api/v1/auth/reset-password", "POST", false, validatedInputData);

            return results;
        },
        onSuccess: (results: any) => {
            addNotification(results.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            console.log(error);
            addNotification(error.message, "error", 7000);
        },
    });

    const sendResetEmail = useMutation({
        mutationFn: async (email: string) => {
            const validatedInputData = validateInputData(sendResetEmailSchema, email);
            
            const results = await useFetch("/api/v1/auth/send-reset-email", "POST", false, validatedInputData);
            console.log(results)
            
            return results;
        },
        onSuccess: (results: any) => {
            addNotification(results.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
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
