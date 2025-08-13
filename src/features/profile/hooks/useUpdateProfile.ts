import { useMutation } from "@tanstack/react-query";
import updateProfile from "../api/updateProfile.api";

export default function useUpdateProfile() {
    const mutation = useMutation({
        mutationFn: updateProfile,
    });

    return {
        mutation,
    };
}
