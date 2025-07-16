import { useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../../../loader/Loader";
import FormInput from "../../../shared/components/form-input/FormInput";

export default function ResetPasswordForm({ token }: { token: string }) {
    const { resetPassword } = useAuth();

    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        resetPassword.mutate({ token, password });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="New Password"
                    type="text"
                    placeholder="New password"
                    data={password}
                    setData={setPassword}
                    required
                />

                <input type="submit" value="Reset Password" />
            </form>
            {resetPassword.isPending && <Loader />}
        </>
    );
}
