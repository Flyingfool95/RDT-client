import "./ProfileDetails.css";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../shared/types";
import useProfile from "./useProfile";
import FormInput from "../shared/components/form-input/FormInput";
import ImageInput from "../shared/components/image-input/ImageInput";
import useFormErrorStore from "../shared/stores/form-errors/useFormErrorsStore";

export default function ProfileDetails() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["auth-check"]) as User;

    const { updateUser } = useProfile();

    const { removeFormErrors } = useFormErrorStore((state) => state);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        updateUser.mutate(formData, {
            onSuccess: () => {
                setName("");
                setEmail("");
                setPassword("");
                setNewPassword("");
                removeFormErrors();
            },
        });
    };

    return (
        <form onSubmit={(e) => handleUpdate(e)}>
            <ImageInput<any> data={user} />

            <FormInput label="Name" type="text" placeholder={user.name} data={name} setData={setName} />
            <FormInput label="Email" type="email" placeholder={user.email} data={email} setData={setEmail} />
            <FormInput label="Current Password" type="password" data={password} setData={setPassword} />
            <FormInput label="New Password" type="password" data={newPassword} setData={setNewPassword} />

            <input type="submit" value="Update" />
        </form>
    );
}
