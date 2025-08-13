import { useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateProfile from "./hooks/useUpdateProfile";
import type { ProfileFormDataType, UserQueryDataType } from "./types";
import cleanObject from "../../helpers/cleanObject.helper";
import { objectToFormData } from "../../helpers/objectToFormData.helper";
import ProfileImageInput from "./components/ProfileImageInput";

/* TODO */
// Add delete image
// Add password inputs
// Error handeling

export default function Profile() {
    const queryClient = useQueryClient();
    const { mutation } = useUpdateProfile();

    const [formData, setFormData] = useState<ProfileFormDataType>({ email: "", name: "", image: "" });
    const formRef = useRef<HTMLFormElement>(null);
    const [previewURL, setPreviewURL] = useState("");

    const { data } = queryClient.getQueryData(["current-user"]) as UserQueryDataType;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const cleanedFormData = objectToFormData(cleanObject(formData));
        mutation.mutate(cleanedFormData, {
            onSuccess: async (result) => {
                queryClient.setQueryData(["current-user"], result);
                handleClearForm();
            },
        });
    }

    function handleClearForm() {
        setFormData({ email: "", name: "", image: "" });
        setPreviewURL("");
        if (formRef.current) {
            formRef.current?.reset();
        }
    }

    return (
        <>
            <h1>Profile</h1>
            <form onSubmit={(e) => handleSubmit(e)} ref={formRef} className={styles.profileForm}>
                <ProfileImageInput
                    existingImage={data?.user.image}
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
                        placeholder={data?.user.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={data?.user.name}
                        value={formData.name}
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
                        onClick={handleClearForm}
                        disabled={formData.email === "" && formData.name === "" && formData.image === ""}
                    >
                        Cancel Changes
                    </button>
                </div>
            </form>
        </>
    );
}
