import { useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateProfile from "./hooks/useUpdateProfile";
import type { ProfileFormDataType } from "./types";
import cleanObject from "../../helpers/cleanObject.helper";
import { objectToFormData } from "../../helpers/objectToFormData.helper";
import ProfileImageInput from "./components/ProfileImageInput";
import useAuthCheck from "../auth/hooks/useAuthCheck";
import useDeleteProfileImage from "./hooks/useDeleteProfileImage";

/* TODO */
// Add delete image
// Add password inputs
// Error handeling

export default function Profile() {
    const queryClient = useQueryClient();
    const { mutation: updateProfile } = useUpdateProfile();
    const { mutation: deleteProfileImage } = useDeleteProfileImage();

    const [formData, setFormData] = useState<ProfileFormDataType>({ email: "", name: "", image: "" });
    const formRef = useRef<HTMLFormElement>(null);

    const [previewURL, setPreviewURL] = useState("");

    const { data } = useAuthCheck() as any;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const cleanedFormData = objectToFormData(cleanObject(formData));
        updateProfile.mutate(cleanedFormData, {
            onSuccess: async (result) => {
                queryClient.setQueryData(["current-user"], result);
                clearForm();
            },
        });
    }

    function clearForm() {
        setFormData({ email: "", name: "", image: "" });
        setPreviewURL("");
        if (formRef.current) {
            formRef.current?.reset();
        }
    }

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
        <>
            <h1>Profile</h1>
            <form onSubmit={(e) => handleSubmit(e)} ref={formRef} className={styles.profileForm}>
                <ProfileImageInput
                    existingImage={data?.image}
                    formData={formData}
                    setFormData={setFormData}
                    previewURL={previewURL}
                    setPreviewURL={setPreviewURL}
                />

                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={data?.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={data?.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </label>

                <div className={styles.formButtons}>
                    <input
                        type="submit"
                        value="Save Changes"
                        disabled={formData.email === "" && formData.name === "" && formData.image === ""}
                    />

                    <button
                        type="button"
                        onClick={clearForm}
                        disabled={formData.email === "" && formData.name === "" && formData.image === ""}
                    >
                        Cancel Changes
                    </button>
                </div>
                { data.image !== "" && <button onClick={deleteImage} type="button">
                    Delete Image
                </button>}
            </form>
        </>
    );
}
