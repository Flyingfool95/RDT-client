import "./ProfileDetails.css";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../shared/types";
import { FromInputData } from "../shared/components/form-input/types";
import useProfile from "./useProfile";
import FormInput from "../shared/components/form-input/FormInput";
import ImageInput from "../shared/components/image-input/ImageInput";

export default function ProfileDetails() {
    const { updateUser } = useProfile();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["auth-check"]) as User;

    const [name, setName] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const [email, setEmail] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const [password, setPassword] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const [confirmPassword, setConfirmPassword] = useState<FromInputData>({ value: "", isError: false, error: "" });

    const formRef = useRef<HTMLFormElement | null>(null);

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
            <ImageInput<any> data={user} />

            <FormInput label="Name" type="text" placeholder={user?.name} data={name} setData={setName} />
            <FormInput label="Email" type="email" placeholder={user?.email} data={email} setData={setEmail} />
            <FormInput label="Current Password" type="password" data={password} setData={setPassword} />
            <FormInput label="New Password" type="password" data={confirmPassword} setData={setConfirmPassword} />

            <input type="submit" value="Update" />
        </form>
    );
}
