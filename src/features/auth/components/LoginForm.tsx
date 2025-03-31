import { useState } from "react";
import "../styles/LoginForm.css";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Loader from "../../loader/components/Loader";

export default function LoginForm() {
    const { loginUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser.mutate({ email, password });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="email"
                    className={loginUser.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
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
                    className={loginUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
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

                <input type="submit" value="Login" />
                <span>
                    Not a user yet? <Link to="/register">Register here!</Link>
                </span>
                <span>
                    Forgotten your password? <Link to="/reset-password">Reset it here!</Link>
                </span>
            </form>

            {loginUser.isPending && <Loader />}
        </>
    );
}
