import useResetPassword from "../../hooks/useResetPassword";

export default function ResetPasswordForm({ token }: { token: string }) {
    const { handleResetPassword, setPassword, formErrors } = useResetPassword({ token });

    return (
        <>
            <h1>Reset password</h1>
            <form onSubmit={handleResetPassword}>
                <label className={formErrors && formErrors.length > 0 ? "input-error" : ""}>
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
    );
}
