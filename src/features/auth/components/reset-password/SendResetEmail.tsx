import useSendResetPasswordEmail from "../../hooks/useSendResetPasswordEmail";

export default function SendResetEmailForm() {
    const { handleSendEmail, setEmail, formErrors } = useSendResetPasswordEmail();

    return (
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
    );
}
