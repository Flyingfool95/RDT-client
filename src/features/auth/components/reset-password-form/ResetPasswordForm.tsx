import { useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../../../loader/Loader";
import FormInput from "../../../shared/components/form-input/FormInput";
import { FromInputData } from "../../../shared/components/form-input/types";

export default function ResetPasswordForm({ token }: { token: string }) {
    const { resetPassword } = useAuth();

    const [password, setPassword] = useState<FromInputData>({ value: "", isError: false, error: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        resetPassword.mutate({ token, password: password.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Text"
                    name="text"
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
