import "../styles/login.css";
import LoginForm from "../../features/auth/components/LoginForm";
import { useEffect } from "react";
import useAuthStore from "../../features/auth/store/useAuthStore";

export default function Login() {
    const { setUser } = useAuthStore((state) => state);

    const handleCheckAuth = async () => {
        const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/auth-check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const res = await result.json();

        console.log(res);

        if (!res.success) return setUser(null);

        setUser(res.data);
    };
    useEffect(() => {
        handleCheckAuth();
    }, []);

    return (
        <main className="login">
            <LoginForm />
        </main>
    );
}
