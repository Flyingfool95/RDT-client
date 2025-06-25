import Loader from "../../../loader/Loader";
import useAuth from "../../useAuth";

export default function SendResetEmailForm() {
    const { sendResetEmail } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendResetEmail.mutate(e.currentTarget);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="email"
                    className={sendResetEmail.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
                >
                    Email
                    <input type="email" name="email" id="email" />
                </label>

                <input type="submit" value="Send email" />
            </form>
            <span className="form-extra">
                Enter your account email above and click <i>"Send email"</i> to receive a password reset link in your
                inbox.
            </span>

            {sendResetEmail.isPending && <Loader />}
        </>
    );
}
