import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotificationStore from "../notifications/useNotificationStore";
import { convertPixelDataToImage, validateInputData } from "../shared/utils/helpers";
import { customFetch } from "../shared/utils/customFetch";
import { TypeResponse } from "../shared/types";
import { loginSchema, registerSchema, resetPasswordSchema, sendResetEmailSchema } from "./validation";
import { TypeUser } from "./types";

export default function useAuth() {
    const queryClient = useQueryClient();
    const { addNotification } = useNotificationStore((state) => state);

    const navigate = useNavigate();

    const registerUser = useMutation({
        mutationFn: async (e: any) => {
            const email = e["email"].value;
            const password = e["password"].value;
            const confirmPassword = e["confirm-password"].value;

            const validatedInputData = validateInputData(registerSchema, { email, password, confirmPassword });

            const results: TypeResponse = await customFetch("/api/v1/auth/register", "POST", false, validatedInputData);

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
        mutationFn: async (e: any) => {
            const email = e["email"].value;
            const password = e["password"].value;
            validateInputData(loginSchema, {
                email,
                password,
            });

            const result = await customFetch("/api/v1/auth/login", "POST", true, {
                email,
                password,
            });
            return result;
        },
        onSuccess: async (result: any) => {
            const user = {
                id: result.data.user.id,
                name: result.data.user.name,
                email: result.data.user.email,
                image: await convertPixelDataToImage(result.data.user.image),
            };

            queryClient.setQueryData(["auth-check"], user);

            addNotification(result.message, "success");
            navigate("/");
        },
        onError: (error) => {
            console.log(error);
            addNotification(error.message, "error", 7000);
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            const results: TypeResponse = await customFetch("/api/v1/auth/logout", "GET", true);

            return results;
        },
        onSuccess: (results) => {
            queryClient.removeQueries({ queryKey: ["auth-check"] });
            addNotification(results.message, "info");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const deleteUser = useMutation({
        mutationFn: async () => {
            const user = queryClient.getQueryData(["auth-check"]) as TypeUser;
            console.log(user);
            if (!user) throw new Error("User does not exist");

            const results: TypeResponse = await customFetch(
                "/api/v1/auth/delete",
                "DELETE",
                true,
                JSON.stringify({ id: user.id })
            );

            return results;
        },
        onSuccess: (results) => {
            queryClient.removeQueries({ queryKey: ["auth-check"] });
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

            const results: TypeResponse = await customFetch(
                "/api/v1/auth/reset-password",
                "POST",
                false,
                validatedInputData
            );

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

    const sendResetEmail = useMutation({
        mutationFn: async (e: any) => {
            const email = e["email"].value;
            const validatedInputData = validateInputData(sendResetEmailSchema, { email });
            const results: TypeResponse = await customFetch(
                "/api/v1/auth/send-reset-email",
                "POST",
                false,
                validatedInputData
            );
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

    return {
        registerUser,
        loginUser,
        logoutUser,
        deleteUser,
        resetPassword,
        sendResetEmail,
    };
}
