import { useState } from "react";
import { errorHandler } from "../../../helpers/errorHandler.helper";
import useRegister from "../hooks/useRegister";
import { Link, useNavigate } from "react-router";

export default function Register() {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const { registerUser } = useRegister();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser.mutate(formData, {
            onSuccess: (result) => {
                console.log(result);
                navigate("/login");
            },

            onError: (error: unknown) => {
                setError(errorHandler(error));
            },
        });
    };
    return (
        <div>
            <h1>Register</h1>
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
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="text"
                        name="confirm-password"
                        id="confirm-password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                </label>
                <input type="submit" value="Login" />

                {/* Make FormError component */}
                <p>{error}</p>
            </form>
            <Link to={"/login"}>Login here!</Link>
        </div>
    );
}
