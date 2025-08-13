import { useQueryClient } from "@tanstack/react-query";
import defaultProfileImage from "../../assets/RDT_logo.png";
import useUpdateProfile from "./hooks/useUpdateProfile";
import { useState } from "react";
import optimizeImage from "../../helpers/optimizeImage.helper";
import type { ProfileFormDataType, UserQueryDataType } from "./types";

export default function Profile() {
    const queryClient = useQueryClient();
    const { mutation } = useUpdateProfile();

    const [formData, setFormData] = useState<ProfileFormDataType>({ email: "", name: "", image: undefined });

    const { data } = queryClient.getQueryData(["current-user"]) as UserQueryDataType;

    const profileImage = data?.user.image != "" ? data?.user.image : defaultProfileImage;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutation.mutate(formData);
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
                        onChange={async (e) =>
                            setFormData({ ...formData, image: await optimizeImage(e.target.files?.[0]) })
                        }
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
                {/* Reset password in seperate modal */}
            </form>
        </>
    );
}
