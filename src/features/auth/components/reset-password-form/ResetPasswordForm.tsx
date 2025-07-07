import { useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../../../loader/Loader";

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
                <label
                    htmlFor="text"
                    className={resetPassword.error?.message.toLowerCase().includes("password") ? "input-error" : ""}
                >
                    New Password
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <input type="submit" value="Reset Password" />
            </form>
            {resetPassword.isPending && <Loader />}
        </>
    );
}
