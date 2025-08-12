import { useState } from "react";
import { Link } from "react-router";
import useSendResetEmail from "../hooks/useSendResetEmail";
import { errorHandler } from "../../../helpers/errorHandler.helper";

export default function ResetPassword() {
    const { mutation } = useSendResetEmail();

    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData, {
            onSuccess: () => {
                setFormData({ email: "" });
            },

            onError: (error) => {
                setError(errorHandler(error));
            },
        });
    };

    return (
        <>
            <h1>Send reset password</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        placeholder="my@email.com"
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value.toLocaleLowerCase() }))
                        }
                    />
                </label>
                <input type="submit" value="Send" />

                {/* Make FormError component */}
                <p>{error}</p>
            </form>
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
            </div>
        </>
    );
}
