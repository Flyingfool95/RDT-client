import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateProfile from "./hooks/useUpdateProfile";
import defaultProfileImage from "../../assets/RDT_logo.png";
import type { ProfileFormDataType, UserQueryDataType } from "./types";
import optimizeImage from "../../helpers/optimizeImage.helper";
import cleanObject from "../../helpers/cleanObject.helper";
import { objectToFormData } from "../../helpers/objectToFormData.helper";
import { arrayToBlobUrl } from "../../helpers/arrayToBlobURL.helper";

export default function Profile() {
    const queryClient = useQueryClient();
    const { mutation } = useUpdateProfile();

    const [formData, setFormData] = useState<ProfileFormDataType>({ email: "", name: "", image: undefined });

    const { data } = queryClient.getQueryData(["current-user"]) as UserQueryDataType;
    const profileImage = data?.user.image != undefined ? arrayToBlobUrl(data?.user.image) : defaultProfileImage;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const cleanedFormData = objectToFormData(cleanObject(formData));
        mutation.mutate(cleanedFormData, {
            onSuccess: async (result) => {
                queryClient.setQueryData(["current-user"], result);
            },
        });
    }

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        let image = e.target.files?.[0] as File;
        return await optimizeImage(image);
    }

    return (
        <>
            <h1>Profile</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="profile-image">
                    Profile Image
                    <input
                        type="file"
                        name="profile-image"
                        id="profile-image"
                        onChange={async (e) => setFormData({ ...formData, image: await handleImageChange(e) })}
                    />
                    <img src={profileImage} alt="Profile Image " />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={data?.user.email}
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </label>

                <input type="submit" value="Update" />
            </form>
            <button>Reset Password</button>
        </>
    );
}
