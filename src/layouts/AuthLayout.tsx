import { Navigate, Outlet } from "react-router";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

export default function AuthLayout() {
    const { data, isLoading } = useAuthCheck();

    if (isLoading) return <h1>Loading...</h1>;
    if (data.success) return <Navigate to={"/"} />;

    return (
        <div>
            <h1>Auth Layout</h1>
            <Outlet />
        </div>
    );
}
