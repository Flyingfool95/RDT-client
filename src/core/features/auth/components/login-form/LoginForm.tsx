import "./LoginForm.css";
import Loader from "../../../loader/Loader";
import useAuth from "../../useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import FormInput from "../../../form-inputs/form-input/FormInput";

export default function LoginForm() {
    const { loginUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser.mutate({ email, password });
    };

    return (
        <>
            <form onSubmit={(e) => handleLogin(e)} className="login-form">
                <FormInput
                    label="Email"
                    type="email"
                    placeholder="my@email.com"
                    data={email}
                    setData={setEmail}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    placeholder=""
                    data={password}
                    setData={setPassword}
                    required
                />

                <input type="submit" value="Login" />
                {loginUser.error && (
                    <span>
                        Forgot your password? <Link to="/reset-password">Recover it</Link>
                    </span>
                )}
            </form>

            <span className="form-extra">
                Don’t have an account? <Link to="/register">Sign up</Link>
            </span>

            {loginUser.isPending && <Loader />}
        </>
    );
}
