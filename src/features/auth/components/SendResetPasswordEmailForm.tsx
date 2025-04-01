import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../../loader/components/Loader";

export default function SendResetEmailForm() {
    const { sendResetEmail } = useAuth();

    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendResetEmail.mutate(email);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="email"
                    className={sendResetEmail.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
                >
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <input type="submit" value="Send email" />

                <p>
                    Fill your accounts email above and click the <i>"Send email"</i> button to recieve the reset
                    password email to your inbox.
                </p>
            </form>

            {sendResetEmail.isPending && <Loader />}
        </>
    );
}
