import "../styles/ProfileDetails.css";
import { useRef } from "react";
import useAuthStore from "../../auth/store/useAuthStore";
import useProfile from "../hooks/useProfile";
import ImageInput from "../../shared/components/ImageInput";
import FormInput from "../../shared/components/FormInput";
import { TypeUser } from "../../auth/types";

export default function ProfileDetails() {
    const { user } = useAuthStore((state) => state);

    const formRef = useRef<HTMLFormElement | null>(null);

    const { updateUser } = useProfile();

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        updateUser.mutate(formData, {
            onSuccess: () => {
                formRef.current?.reset();
            },
            onError: (error) => {
                console.error("Update failed:", error);
            },
        });
    };

    return (
        <form onSubmit={(e) => handleUpdate(e)} ref={formRef}>
            <ImageInput<TypeUser | null> data={user} />

            <FormInput
                classNames={updateUser.error?.message.toLowerCase().includes("name") ? "zod-error" : ""}
                label="Name"
                name="name"
                type="text"
                placeholder={user?.name}
            />
            <FormInput
                classNames={updateUser.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
                label="Email"
                name="email"
                type="email"
                placeholder={user?.email}
            />
            <FormInput
                classNames={updateUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                label="Current Password"
                name="current-password"
                type="password"
            />
            <FormInput
                classNames={updateUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                label="New Password"
                name="new-password"
                type="password"
            />

            <input type="submit" value="Update" />
        </form>
    );
}
