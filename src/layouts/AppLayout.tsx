import styles from "./styles/AppLayout.module.css";
import { Navigate, NavLink, Outlet } from "react-router";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";
import useLogout from "../features/auth/hooks/useLogout";

export default function AppLayout() {
    const { data, isLoading } = useAuthCheck();
    const { logoutUser } = useLogout();

    if (!data?.success) return <Navigate to={"/login"} />;
    if (isLoading) return <h1>Loading...</h1>;

    return (
        <div className={styles.appLayout}>
            <header>
                <nav>
                    <img src="#" alt="Logo" />

                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/profile">Profile</NavLink>

                    <button onClick={() => logoutUser.mutate()}>Logout</button>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
