import "./RegisterForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../useAuth";
import FormInput from "../../../shared/components/form-input/FormInput";

export default function RegisterForm() {
    const { registerUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerUser.mutate({ email, password, confirmPassword });
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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    placeholder=""
                    data={confirmPassword}
                    setData={setConfirmPassword}
                    required
                />

                <input type="submit" value="Register" />
            </form>
            <span className="form-extra">
                Already have an account? <Link to="/login">Log in here!</Link>
            </span>
        </>
    );
}
