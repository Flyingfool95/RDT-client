import "./ProfileDetails.css";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../shared/types";
import useProfile from "./useProfile";
import FormInput from "../shared/components/form-input/FormInput";
import ImageInput from "../shared/components/image-input/ImageInput";

export default function ProfileDetails() {
    const { updateUser } = useProfile();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["auth-check"]) as User;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState<Array<string>>([]);

    const formRef = useRef<HTMLFormElement | null>(null);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        updateUser.mutate(formData, {
            onSuccess: (result) => {
                if (!result.success) {
                    setErrors(result.errors?.map((err) => err.path) as Array<string>);
                    throw Error(result.errors?.map((err) => err.message).join("\n"));
                }

                setName("");
                setEmail("");
                setPassword("");
                setNewPassword("");
                setErrors([]);
                formRef.current?.reset();
            },
        });
    };

    return (
        <form onSubmit={(e) => handleUpdate(e)} ref={formRef}>
            <ImageInput<any> data={user} />

            <FormInput label="Name" type="text" placeholder={user.name} data={name} setData={setName} errors={errors} />
            <FormInput
                label="Email"
                type="email"
                placeholder={user.email}
                data={email}
                setData={setEmail}
                errors={errors}
            />
            <FormInput label="Current Password" type="password" data={password} setData={setPassword} errors={errors} />
            <FormInput
                label="New Password"
                type="password"
                data={newPassword}
                setData={setNewPassword}
                errors={errors}
            />

            <input type="submit" value="Update" />
        </form>
    );
}
