import "./LoginForm.css";
import Loader from "../../../loader/Loader";
import FormInput from "../../../shared/components/form-input/FormInput";
import useAuth from "../../useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginForm() {
    const { loginUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Array<string>>([]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser.mutate(
            { email, password },
            {
                onSuccess: (result) => {
                    if (!result.success) {
                        setErrors(result.errors?.map((err) => err.path) as Array<string>);
                        throw Error(result.errors?.map((err) => err.message).join("\n"));
                    }
                },
            }
        );
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <>
            <form onSubmit={(e) => handleLogin(e)} className="login-form">
                <FormInput
                    label="Email"
                    type="email"
                    placeholder="my@email.com"
                    data={email}
                    setData={setEmail}
                    errors={errors}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    placeholder=""
                    data={password}
                    setData={setPassword}
                    errors={errors}
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
