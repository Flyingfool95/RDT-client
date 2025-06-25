import "./AppNavigation.css";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../../assets/rdt-logo.png";
import useAuth from "../../features/auth/useAuth";

export default function AppNavigation() {
    const { logoutUser } = useAuth();

    return (
        <>
            <nav>
                <img src={Logo} alt="Logo" className="logo" />
                <NavLink to={"/"}>Dashboard</NavLink>
                <NavLink to={"/profile"}>Profile</NavLink>
                <button onClick={() => logoutUser.mutate()} className="button-secondary">Logout</button>
            </nav>
            <Outlet />
        </>
    );
}
