import { Link, Navigate, NavLink, Outlet } from "react-router";
import logo from "../assets/RDT_logo.png";
import styles from "./styles/AppLayout.module.css";
import useLogout from "../features/auth/hooks/useLogout";
import { arrayToBlobUrl } from "../helpers/arrayToBlobURL.helper";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

export default function AppLayout() {
    const { mutation } = useLogout();

    const { data } = useAuthCheck() as any;
    console.log(data);

    if (!data) return <Navigate to={"/login"} />;

    return (
        <div className={styles.appLayout}>
            <header className={styles.appHeader}>
                <nav>
                    <Link to="/profile" className="logo-link">
                        <img src={data.image != "" ? arrayToBlobUrl(data.image) : logo} alt="Logo" className="logo" />
                    </Link>

                    <NavLink to="/">Dashboard</NavLink>

                    <button onClick={() => mutation.mutate()}>Logout</button>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
