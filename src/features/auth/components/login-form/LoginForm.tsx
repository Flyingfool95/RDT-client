import "./LoginForm.css";
import Loader from "../../../loader/Loader";
import FormInput from "../../../shared/components/form-input/FormInput";
import useAuth from "../../useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FromInputData } from "../../../shared/components/form-input/types";

export default function LoginForm() {
    const { loginUser } = useAuth();

    const [email, setEmail] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const [password, setPassword] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser.mutate({ email: email.value, password: password.value });
    };

    return (
        <>
            <form onSubmit={(e) => handleLogin(e)} className="login-form">
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="my@email.com"
                    data={email}
                    setData={setEmail}
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="*********"
                    data={password}
                    setData={setPassword}
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
