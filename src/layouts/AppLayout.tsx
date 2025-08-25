import { Navigate, Outlet } from "react-router";
import styles from "./styles/AppLayout.module.css";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";
import AppNavigation from "./components/AppNavigation";

export default function AppLayout() {
    const { data } = useAuthCheck();
    if (!data) return <Navigate to={"/login"} />;

    return (
        <div className={styles.appLayout}>
            <header className={styles.appHeader}>
                <AppNavigation />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
