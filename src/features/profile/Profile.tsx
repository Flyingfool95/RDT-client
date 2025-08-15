import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./Profile.module.css";
import type { ProfileFormDataType } from "./types";
import cleanObject from "../../helpers/cleanObject.helper";
import { objectToFormData } from "../../helpers/objectToFormData.helper";
import ProfileImageInput from "./components/ProfileImageInput";
import useAuthCheck from "../auth/hooks/useAuthCheck";
import useUpdateProfile from "./hooks/useUpdateProfile";
import DeleteProfileImage from "./components/DeleteProfileImage";

/* TODO */
// Add password inputs
// Doing any action and invalid accesstoken should auto refresh tokens

export default function Profile() {
    const queryClient = useQueryClient();
    const { mutation: updateProfile } = useUpdateProfile();

    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState<ProfileFormDataType>({ email: "", name: "", image: "" });
    const [previewURL, setPreviewURL] = useState("");
    const [formErrors, setFormErrors] = useState<{ message: string; path: string }[]>([]);

    const { data } = useAuthCheck() as any;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const cleanedFormData = objectToFormData(cleanObject(formData));
        updateProfile.mutate(cleanedFormData, {
            onSuccess: async (result) => {
                queryClient.setQueryData(["current-user"], result);
                clearForm();
            },

            onError: (error: any) => {
                setFormErrors(error.errors);
            },
        });
    }

    function clearForm() {
        setFormData({ email: "", name: "", image: "" });
        setPreviewURL("");
        setFormErrors([]);
        if (formRef.current) {
            formRef.current?.reset();
        }
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

                <label
                    htmlFor="email"
                    className={formErrors.some((error) => error.path === "email") ? "input-error" : ""}
                >
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={data?.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
                <label
                    htmlFor="name"
                    className={formErrors.some((error) => error.path === "name") ? "input-error" : ""}
                >
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
                {formErrors.length > 0 && formErrors.map((error) => <p key={error.message}>{error.message}</p>)}
                {data.image !== "" && <DeleteProfileImage />}
            </form>
        </>
    );
}
