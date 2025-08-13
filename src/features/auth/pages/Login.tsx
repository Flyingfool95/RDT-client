import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { errorHandler } from "../../../helpers/errorHandler.helper";
import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutation } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData, {
            onSuccess: (result) => {
                queryClient.setQueryData(["current-user"], result);
                navigate("/");
            },

            onError: (error: unknown) => {
                setError(errorHandler(error));
            },
        });
    };

    return (
        <>
            <h1>Welcome to RDT</h1>
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
            <div className="form-links">
                <Link to={"/register"}>Register new account!</Link>
                {error.includes("Incorrect credentials") && <Link to={"/reset-password"}>Reset password</Link>}
            </div>
        </>
    );
}
