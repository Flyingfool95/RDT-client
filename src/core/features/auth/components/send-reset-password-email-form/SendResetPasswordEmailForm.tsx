import { useState } from "react";
import Loader from "../../../loader/Loader";
import useAuth from "../../useAuth";
import FormInput from "../../../form-inputs/form-input/FormInput";

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
                <FormInput
                    label="Email"
                    type="email"
                    placeholder="my@email.com"
                    data={email}
                    setData={setEmail}
                    required
                />

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
