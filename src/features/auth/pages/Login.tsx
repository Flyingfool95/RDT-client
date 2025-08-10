import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const { loginUser } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser.mutate(formData);
    };

    return (
        <div>
            <h1>Login</h1>
            <Form handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
        </div>
    );
}

function Form({
    handleSubmit,
    formData,
    setFormData,
}: {
    handleSubmit: (e: React.FormEvent) => void;
    formData: { email: string; password: string };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            email: string;
            password: string;
        }>
    >;
}) {
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    placeholder="my@email.com"
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
}
