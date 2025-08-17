import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfile from "../api/updateProfile.api";
import cleanObject, { objectToFormData } from "../../../helpers/object.helpers";
import type { ApiErrorType } from "../../../classes/ApiError.class";

export default function useUpdateProfile() {
    const queryClient = useQueryClient();

    const formRef = useRef<HTMLFormElement>(null);

    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [image, setImage] = useState<File | Blob | null>(null);
    const [currentPassword, setCurrentPassword] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState<Array<{ message: string; path: string }> | null>(null);
    const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: async (result) => {
            queryClient.setQueryData(["current-user"], result);
            resetForm();
        },

        onError: (error: Error) => {
            const apiError = error as ApiErrorType;
            console.error(apiError);
            console.log(apiError.errors)
            setFormErrors(apiError.errors);
        },
    });

    const resetForm = () => {
        setEmail(null);
        setName(null);
        setImage(null);
        setCurrentPassword(null);
        setNewPassword(null);
        setFormErrors(null);
        setImagePreviewURL(null);
        formRef.current?.reset();
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const cleanedFormData = objectToFormData(
            cleanObject({
                email,
                name,
                image,
                currentPassword,
                newPassword,
            })
        );
        mutation.mutate(cleanedFormData);
    }

    return {
        formRef,
        email,
        setEmail,
        name,
        setName,
        image,
        setImage,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        formErrors,
        imagePreviewURL,
        setImagePreviewURL,
        resetForm,
        handleSubmit,
    };
}
