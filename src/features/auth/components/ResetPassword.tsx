import { Link } from "react-router";
import useSendResetEmail from "../hooks/useSendResetPasswordEmail";
import useResetPassword from "../hooks/useResetPassword";

export default function ResetPassword() {
    const { handleSendEmail, setEmail, formErrors } = useSendResetEmail();
    const { token, handleResetPassword, setPassword } = useResetPassword();

    return (
        <>
            {!token ? (
                <>
                    <h1>Send reset-password email</h1>
                    <form onSubmit={handleSendEmail}>
                        <label className={formErrors && formErrors.length > 0 ? "input-error" : ""}>
                            Email
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="my@email.com"
                                onChange={(e) => setEmail(e.target.value === "" ? null : e.target.value)}
                            />
                        </label>
                        <input type="submit" value="Send" />
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
                                onChange={(e) => setPassword(e.target.value === "" ? null : e.target.value)}
                            />
                        </label>
                        <input type="submit" value="Reset" />
                    </form>
                </>
            )}
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
            </div>
        </>
    );
}
