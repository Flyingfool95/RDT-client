import "./AppNavigation.css";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../../../assets/rdt-logo.png";
import { useState } from "react";
import useAuth from "../../features/auth/useAuth";

export default function AppNavigation() {
    const { logoutUser } = useAuth();

    const [isMobile] = useState(window.innerWidth <= 768);
    const [isOpen, setIsOpen] = useState(false);

    const dynamicNavClasses = `
        ${isMobile ? "nav-mobile" : ""}
        ${isOpen ? "nav-open" : ""}
    `.trim();

    const handleOpenNav = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!isMobile) return;
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <nav className={dynamicNavClasses} onClick={(e) => handleOpenNav(e)}>
                <img src={Logo} alt="Logo" className="logo" />
                <div className="nav-links">
                    <NavLink to={"/"}>Dashboard</NavLink>
                    <NavLink to={"/profile"}>Profile</NavLink>
                </div>
                <button onClick={() => logoutUser.mutate()} className="button-secondary">
                    Logout
                </button>
            </nav>
            <Outlet />
        </>
    );
}
