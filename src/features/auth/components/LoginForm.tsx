import "../styles/LoginForm.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../../loader/components/Loader";
import FormInput from "../../shared/components/FormInput";

export default function LoginForm() {
    const { loginUser } = useAuth();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser.mutate(e.currentTarget);
    };

    return (
        <>
            <form onSubmit={(e) => handleLogin(e)} className="login-form">
                <FormInput
                    classNames={loginUser.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="my@email.com"
                />
                <FormInput
                    classNames={loginUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                    label="Password"
                    name="password"
                    type="password"
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
