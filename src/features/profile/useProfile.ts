import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertPixelDataToImage, getFilteredFormData } from "../shared/utils/helpers";
import useAuth from "../auth/useAuth";
import { TypeUserResponse } from "../auth/types";
import { customFetchFormData } from "../shared/utils/customFetch";
import useNotificationStore from "../notifications/useNotificationStore";

export default function useProfile() {
    const queryClient = useQueryClient();

    const { addNotification } = useNotificationStore((state) => state);
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
            const user = {
                id: results.data.user.id,
                name: results.data.user.name,
                email: results.data.user.email,
                image: await convertPixelDataToImage(results.data.user.image),
            };
            queryClient.setQueryData(["auth-check"], user);
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
