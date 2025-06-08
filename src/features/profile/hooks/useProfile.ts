import { useMutation } from "@tanstack/react-query";
import { convertPixelDataToImage, getFilteredFormData } from "../../shared/helpers/helpers";
import useNotificationStore from "../../notifications/store/useNotificationStore";
import useAuthStore from "../../auth/store/useAuthStore";
import { TypeUserResponse } from "../../auth/types";
import useAuth from "../../auth/hooks/useAuth";
import { customFetchFormData } from "../../shared/helpers/customFetch";

export default function useProfile() {
    const { addNotification } = useNotificationStore((state) => state);
    const { setUser } = useAuthStore((state) => state);
    const { logoutUser } = useAuth();

    const updateUser = useMutation({
        mutationFn: async (formData: FormData) => {
            formData = getFilteredFormData(formData);

            const results: TypeUserResponse = await customFetchFormData(
                "/api/v1/profile/update",
                "PATCH",
                true,
                formData
            );

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
        },
        onError: (error) => {
            addNotification(error.message, "error", 7000);
            if (error.message === "No refresh token found") {
                logoutUser.mutate();
            }
        },
    });

    return {
        updateUser,
    };
}
