import { useMutation } from "@tanstack/react-query";
import { convertPixelDataToImage, useFetch, validateInputData } from "../../shared/helpers";
import { updateImageSchema } from "../../../../zod/profile";
import useNotificationStore from "../../notifications/store/useNotificationStore";
import { updateUserSchema } from "../../../../zod/auth";
import useAuthStore from "../../auth/store/useAuthStore";

export default function useProfile() {
    const { addNotification } = useNotificationStore((state) => state);
    const { setUser } = useAuthStore((state) => state);

    const updateImage = useMutation({
        mutationFn: async (image: Blob) => {
            const validatedInputData = validateInputData(updateImageSchema, image);

            const results = await useFetch("/api/v1/profile/update-image", "PATCH", true, validatedInputData);

            return results;
        },
        onSuccess: async (results) => {
            addNotification(results.message, "success");
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

            const results = await useFetch("/api/v1/profile/update", "PUT", true, validatedInputData);

            return results;
        },
        onSuccess: async (results) => {
            setUser({
                id: results.data.id,
                name: results.data.name,
                email: results.data.email,
                image: await convertPixelDataToImage(results.data.image),
            });
            addNotification(results.message, "success");
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
        },
    });

    return {
        updateUser,
        updateImage,
    };
}
