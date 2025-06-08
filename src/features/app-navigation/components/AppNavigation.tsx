import "../style/AppNavigation.css";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";

export default function AppNavigation() {
    const { logoutUser } = useAuth();

    return (
        <>
            <nav>
                <img src="#" alt="Logo" className="logo" />
                <NavLink to={"/"}>Dashboard</NavLink>
                <NavLink to={"/profile"}>Profile</NavLink>
                <NavLink to={"/domain"}>Domain</NavLink>
                <button onClick={() => logoutUser.mutate()}>Logout</button>
            </nav>
            <Outlet />
        </>
    );
}
