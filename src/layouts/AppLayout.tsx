import styles from "./styles/AppLayout.module.css";
import { Link, Navigate, NavLink, Outlet } from "react-router";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

export default function AppLayout() {
    const { data, isLoading } = useAuthCheck();

    if (!data?.success) return <Navigate to={"/login"} />;
    if (isLoading) return <h1>Loading...</h1>;

    return (
        <div className={styles.appLayout}>
            <header>
                <nav>
                    <img src="#" alt="Logo" />

                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
