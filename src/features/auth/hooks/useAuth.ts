import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { IUser } from "../../../../types/auth";
import { loginSchema, registerSchema, updateUserSchema } from "../../../../zod/auth";
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
            const result = validateInputData(registerSchema, { email, password, confirmPassword });

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            });

            if (response.status >= 400) {
                throw new Error(`Something went wrong. Error code: ${response.status}`);
            }

            const data = await response.json();

            addNotification({ message: "User registered", type: "success" });

            return data;
        },
        onSuccess: () => {
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

            addNotification({ message: "Logged in", type: "success" });

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

    const updateUser = useMutation({
        mutationFn: async (updateData: {
            currentPassword?: string;
            newPassword?: string;
            email?: string;
            name?: string;
        }) => {
            // Add client-side validation schema for updates
            const validatedData = validateInputData(updateUserSchema, updateData);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(validatedData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Update failed");
            }

            return await response.json();
        },
        onSuccess: (data: IUser) => {
            setUser(data);
            addNotification({ message: "Profile updated successfully", type: "success" });
        },
        onError: (error) => {
            addNotification({
                message: error.message || "Failed to update profile",
                type: "error",
                duration: 7000,
            });
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            const results = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
                method: "GET",
                credentials: "include",
            });

            if (results.status >= 400) {
                throw new Error(`Something went wrong. Error code: ${results.status}`);
            }
        },
        onSuccess: () => {
            setUser(null);
            addNotification({ message: "Logged out", type: "info" });
            navigate("/login");
        },
        onError: (error) => {
            addNotification({ message: error.message, type: "error", duration: 7000 });
        },
    });

    const deleteUser = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("User does not exist");

            const results = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: user.id }),
            });

            if (results.status !== 200) {
                throw new Error("Something went wrong when deleting user");
            }
        },
        onSuccess: () => {
            setUser(null);
            addNotification({ message: "User deleted successfully", type: "success" });
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
    };
}
