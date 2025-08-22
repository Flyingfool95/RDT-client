import { checkFormErrors } from "../../../../helpers/form.helpers";
import useSendResetPasswordEmail from "../../hooks/useSendResetPasswordEmail";

export default function SendResetEmailForm() {
    const { handleSendEmail, setEmail, formErrors } = useSendResetPasswordEmail();
    return (
        <>
            <h1>Send reset-password email</h1>
            <form onSubmit={handleSendEmail}>
                <label
                    className={checkFormErrors(formErrors, "email") || checkFormErrors(formErrors) ? "input-error" : ""}
                >
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
                {checkFormErrors(formErrors) && <p>{formErrors?.map((err) => err.message).join(", ")}</p>}
            </form>
        </>
    );
}
