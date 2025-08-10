import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { APIError } from "../../../classes/apiError";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const { loginUser } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser.mutate(formData, {
            onSuccess: (result) => {
                console.log(result);
            },

            onError: (error: unknown) => {
                if (error instanceof APIError) {
                    console.log(error.errors);
                    setError(error.errors.map(err => err.message).join(", "));
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            },
        });
    };

    return (
        <div>
            <h1>Login</h1>
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
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                </label>
                <input type="submit" value="Login" />

                {/* Make FormError component */}
                <p>{error}</p>
            </form>
        </div>
    );
}
