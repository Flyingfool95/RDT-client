import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginSchema, registerSchema, resetPasswordSchema, sendResetEmailSchema } from "../validation";
import { convertPixelDataToImage, validateInputData } from "../../shared/helpers";

import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../../notifications/store/useNotificationStore";
import { customFetch } from "../../shared/helpers";
import { TypeUserResponse } from "../types";

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

            const results = await customFetch("/api/v1/auth/register", "POST", false, validatedInputData);

            console.log(results);

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

            const results: TypeUserResponse = await customFetch("/api/v1/auth/login", "POST", true, validatedInputData);

            return results;
        },
        onSuccess: async (results) => {
            setUser({
                id: results.data.user.id,
                name: results.data.user.name,
                email: results.data.user.email,
                image: await convertPixelDataToImage(results.data.user.image),
            });
            addNotification(results.message, "success");
            navigate("/");
        },
        onError: (error) => {
            console.log(error);
            addNotification(error.message, "error", 7000);
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            const results = await customFetch("/api/v1/auth/logout", "GET", true);

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

            const results = await customFetch("/api/v1/auth/delete", "DELETE", true, JSON.stringify({ id: user.id }));

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

            const results = await customFetch("/api/v1/auth/reset-password", "POST", false, validatedInputData);

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
        mutationFn: async (data: { email: string }) => {
            const validatedInputData = validateInputData(sendResetEmailSchema, data);

            const results = await customFetch("/api/v1/auth/send-reset-email", "POST", false, validatedInputData);

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
        logoutUser,
        deleteUser,
        resetPassword,
        sendResetEmail,
    };
}
