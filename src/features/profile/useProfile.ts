import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertPixelDataToImage, getFilteredFormData } from "../shared/utils/helpers";
import useAuth from "../auth/useAuth";
import { customFetchFormData } from "../shared/utils/customFetch";
import useNotificationStore from "../notifications/useNotificationStore";
import { RDTResponse } from "../shared/types";
import useFormErrorStore from "../shared/stores/form-errors/useFormErrorsStore";
import { FormErrors } from "../shared/stores/form-errors/types";

export default function useProfile() {
    const queryClient = useQueryClient();

    const { setFormErrors } = useFormErrorStore((state) => state);
    const { addNotification } = useNotificationStore((state) => state);
    const { logoutUser } = useAuth();

    const updateUser = useMutation({
        mutationFn: async (formData: FormData) => {
            formData = getFilteredFormData(formData);
            const result: RDTResponse = await customFetchFormData("/api/v1/profile/update", "PATCH", true, formData);

            return result;
        },
        onSuccess: async (result) => {
            if (!result.success) {
                setFormErrors(result.errors as FormErrors);
                throw Error("Update failed");
            }

            const user = {
                id: result.data.id,
                name: result.data.name,
                email: result.data.email,
                image: await convertPixelDataToImage(result.data.image),
            };
            queryClient.setQueryData(["auth-check"], user);
            addNotification(result.message, "success");
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
