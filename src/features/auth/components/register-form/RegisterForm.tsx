import "./RegisterForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../useAuth";
import { FromInputData } from "../../../shared/components/form-input/types";
import FormInput from "../../../shared/components/form-input/FormInput";

export default function RegisterForm() {
    const { registerUser } = useAuth();

    const [email, setEmail] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const [password, setPassword] = useState<FromInputData>({ value: "", isError: false, error: "" });
    const [confirmPassword, setConfirmPassword] = useState<FromInputData>({ value: "", isError: false, error: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerUser.mutate({ email: email.value, password: password.value, confirmPassword: confirmPassword.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="register-form">
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
                    placeholder=""
                    data={password}
                    setData={setPassword}
                />

                <FormInput
                    label="Confirm Password"
                    name="confirm-password"
                    type="password"
                    placeholder=""
                    data={confirmPassword}
                    setData={setConfirmPassword}
                />

                <input type="submit" value="Register" />
            </form>
            <span className="form-extra">
                Already have an account? <Link to="/login">Log in here!</Link>
            </span>
        </>
    );
}
