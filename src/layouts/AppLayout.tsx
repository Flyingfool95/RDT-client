import { Navigate, Outlet } from "react-router";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

export default function AppLayout() {
    const { data, isLoading } = useAuthCheck();

    if (isLoading) return <h1>Loading...</h1>;

    if (!data.success) return <Navigate to={"/login"} />;

    return (
        <div>
            <h1>App Layout</h1>
            <Outlet />
        </div>
    );
}
