import { useMutation } from "@tanstack/react-query";
import deleteProfileImage from "../api/deleteProfileImage.api";

export default function useDeleteProfileImage() {
    const mutation = useMutation({
        mutationFn: deleteProfileImage,
    });

    return {
        mutation,
    };
}
