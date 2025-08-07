import { Outlet } from "react-router";

export default function AuthLayout() {
    /* Check if user is in cache, if so redirect to login */
    return (
        <div>
            <h1>Auth Layout</h1>
            <Outlet />
        </div>
    );
}
