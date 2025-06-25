import "./RegisterForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../useAuth";

export default function RegisterForm() {
    const { registerUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerUser.mutate(e.currentTarget);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="register-form">
                <label
                    htmlFor="email"
                    className={registerUser.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
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

                <label
                    htmlFor="password"
                    className={registerUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                >
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label
                    htmlFor="confirm-password"
                    className={registerUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                >
                    Confirm Password
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>

                <input type="submit" value="Register" />
            </form>
            <span className="form-extra">
                Already have an account? <Link to="/login">Log in here!</Link>
            </span>
        </>
    );
}
