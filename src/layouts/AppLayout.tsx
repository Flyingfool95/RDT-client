import { Outlet } from "react-router";

export default function AppLayout() {
    /* Check if user exists in cahce, else redirect to login */
    return (
        <div>
            <h1>App Layout</h1>
            <Outlet />
        </div>
    );
}
