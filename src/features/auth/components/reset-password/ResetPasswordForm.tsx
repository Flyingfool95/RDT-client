import { checkFormErrors } from "../../../../helpers/form.helpers";
import useResetPassword from "../../hooks/useResetPassword";

export default function ResetPasswordForm({ token }: { token: string }) {
    const { handleResetPassword, setPassword, formErrors } = useResetPassword({ token });

    return (
        <>
            <h1>Reset password</h1>
            <form onSubmit={handleResetPassword}>
                <label
                    className={checkFormErrors(formErrors, "email") || checkFormErrors(formErrors) ? "input-error" : ""}
                >
                    New Password
                    <input
                        type="text"
                        name="new-password"
                        id="new-password"
                        onChange={(e) => setPassword(e.target.value === "" ? null : e.target.value)}
                    />
                </label>
                <input type="submit" value="Reset" />
                {checkFormErrors(formErrors) && <p>{formErrors?.map((err) => err.message).join(", ")}</p>}
            </form>
        </>
    );
}
