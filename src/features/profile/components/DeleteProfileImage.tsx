import { useQueryClient } from "@tanstack/react-query";
import useDeleteProfileImage from "../hooks/useDeleteProfileImage";

export default function DeleteProfileImage() {
    const queryClient = useQueryClient();

    const { mutation: deleteProfileImage } = useDeleteProfileImage();

    function deleteImage() {
        deleteProfileImage.mutate(
            { image: "" },
            {
                onSuccess: async (result) => {
                    queryClient.setQueryData(["current-user"], result);
                },
            }
        );
    }
    return (
        <button onClick={deleteImage} type="button">
            Delete Image
        </button>
    );
}
