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
            <form onSubmit={(e) => handleLogin(e)}>
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
