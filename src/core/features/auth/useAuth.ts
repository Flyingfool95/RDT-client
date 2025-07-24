import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RDTResponse, User } from "../shared/types";
import { LoginUserProps } from "./components/login-form/types";
import { RegisterUserProps } from "./components/register-form/types";
import useNotificationStore from "../notifications/useNotificationStore";
import { convertPixelDataToImage } from "../shared/utils/helpers";
import { customFetch } from "../shared/utils/customFetch";
import { FormErrors } from "../shared/stores/form-errors/types";
import useFormErrorStore from "../form-inputs/stores/form-errors/useFormErrorsStore";

export default function useAuth() {
    const queryClient = useQueryClient();

    const { addNotification } = useNotificationStore((state) => state);
    const { setFormErrors } = useFormErrorStore((state) => state);

    const navigate = useNavigate();

    const registerUser = useMutation({
        mutationFn: async ({ email, password, confirmPassword }: RegisterUserProps) => {
            const result: RDTResponse = await customFetch("/api/v1/auth/register", "POST", false, {
                email,
                password,
                confirmPassword,
            });

            return result;
        },
        onSuccess: (result) => {
            if (!result.success) {
                setFormErrors(result.errors as FormErrors);
                throw Error("Update failed");
            }

            addNotification(result.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const loginUser = useMutation({
        mutationFn: async ({ email, password }: LoginUserProps) => {
            const result: RDTResponse = await customFetch("/api/v1/auth/login", "POST", true, {
                email,
                password,
            });
            return result;
        },
        onSuccess: async (result) => {
            if (!result.success) {
                setFormErrors(result.errors as FormErrors);
                throw Error("Login failed");
            }

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
            console.error(error);
            addNotification(error.message, "error", 7000);
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            const result: RDTResponse = await customFetch("/api/v1/auth/logout", "GET", true);
            return result;
        },
        onSuccess: (result) => {
            queryClient.removeQueries({ queryKey: ["auth-check"] });
            addNotification(result.message, "info");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const deleteUser = useMutation({
        mutationFn: async () => {
            const user = queryClient.getQueryData(["auth-check"]) as User;
            if (!user) throw new Error("User does not exist");

            const result: RDTResponse = await customFetch(
                "/api/v1/auth/delete",
                "DELETE",
                true,
                JSON.stringify({ id: user.id })
            );

            return result;
        },
        onSuccess: (result) => {
            queryClient.removeQueries({ queryKey: ["auth-check"] });
            addNotification(result.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const sendResetEmail = useMutation({
        mutationFn: async (email: string) => {
            const result: RDTResponse = await customFetch("/api/v1/auth/send-reset-email", "POST", false, { email });
            return result;
        },
        onSuccess: (result) => {
            if (!result.success) {
                setFormErrors(result.errors as FormErrors);
                throw Error("Sending failed");
            }

            addNotification(result.message, "success");
            navigate("/login");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    const resetPassword = useMutation({
        mutationFn: async ({ token, password }: { token: string; password: string }) => {
            const result: RDTResponse = await customFetch("/api/v1/auth/reset-password", "POST", false, {
                token,
                password,
            });

            return result;
        },
        onSuccess: (result) => {
            if (!result.success) {
                setFormErrors(result.errors as FormErrors);
                throw Error("Reset failed");
            }

            addNotification(result.message, "success");
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
        sendResetEmail,
        resetPassword,
    };
}
