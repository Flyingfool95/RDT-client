import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { errorHandler } from "../../../helpers/errorHandler.helper";
import useSendResetEmail from "../hooks/useSendResetPasswordEmail";
import useResetPassword from "../hooks/useResetPassword";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { mutation: sendEmail } = useSendResetEmail();
    const { mutation: resetPassword } = useResetPassword();

    const [emailData, setEmailData] = useState({ email: "" });
    const [passwordData, setPasswordData] = useState({ password: "" });
    const [error, setError] = useState("");

    const token = searchParams.get("token");

    function handleSendEmail(e: React.FormEvent) {
        e.preventDefault();
        sendEmail.mutate(emailData, {
            onSuccess: () => {
                setEmailData({ email: "" });
            },

            onError: (error) => {
                setError(errorHandler(error));
            },
        });
    }

    function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        resetPassword.mutate(
            { token, password: passwordData.password },
            {
                onSuccess: () => {
                    navigate("/login");
                },
                onError: (error) => {
                    console.error(error);
                },
            }
        );
    }

    return (
        <>
            {!token ? (
                <>
                    <h1>Send reset-password email</h1>
                    <form onSubmit={handleSendEmail}>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={emailData.email}
                                placeholder="my@email.com"
                                onChange={(e) => setEmailData({ email: e.target.value.toLocaleLowerCase() })}
                            />
                        </label>
                        <input type="submit" value="Send" />

                        {/* Make FormError component */}
                        <p>{error}</p>
                    </form>
                </>
            ) : (
                <>
                    <h1>Reset password</h1>
                    <form onSubmit={handleResetPassword}>
                        <label>
                            New Password
                            <input
                                type="text"
                                name="new-password"
                                id="new-password"
                                value={passwordData.password}
                                onChange={(e) => setPasswordData({ password: e.target.value })}
                            />
                        </label>
                        <input type="submit" value="Reset" />

                        {/* Make FormError component */}
                        <p>{error}</p>
                    </form>
                </>
            )}
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
            </div>
        </>
    );
}
