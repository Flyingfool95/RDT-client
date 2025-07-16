import { useState } from "react";
import Loader from "../../../loader/Loader";
import FormInput from "../../../shared/components/form-input/FormInput";
import { FromInputData } from "../../../shared/components/form-input/types";
import useAuth from "../../useAuth";

export default function SendResetEmailForm() {
    const { sendResetEmail } = useAuth();

    const [email, setEmail] = useState<FromInputData>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendResetEmail.mutate(email.value);
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
