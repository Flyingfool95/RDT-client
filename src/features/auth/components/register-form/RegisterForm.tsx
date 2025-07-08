import "./RegisterForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../useAuth";
import { FromInputData } from "../../../shared/components/form-input/types";
import FormInput from "../../../shared/components/form-input/FormInput";
import { confirmPasswordSchema, emailSchema, passwordSchema } from "../../../shared/validations";

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
                    type="email"
                    placeholder="my@email.com"
                    data={email}
                    setData={setEmail}
                    validationSchema={emailSchema}
                />

                <FormInput
                    label="Password"
                    type="password"
                    placeholder=""
                    data={password}
                    setData={setPassword}
                    validationSchema={passwordSchema}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    placeholder=""
                    data={confirmPassword}
                    setData={setConfirmPassword}
                    validationSchema={confirmPasswordSchema(password.value)}
                />

                <input type="submit" value="Register" />
            </form>
            <span className="form-extra">
                Already have an account? <Link to="/login">Log in here!</Link>
            </span>
        </>
    );
}
