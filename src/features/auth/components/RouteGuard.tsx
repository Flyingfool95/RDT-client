import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function RouteGuard({ isProtected }: { isProtected: boolean }) {
    const location = useLocation();

    const { user, setUser, isAuthChecked, setIsAuthChecked } = useAuthStore((state) => state);

    const handleCheckAuth = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/auth-check`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                signal: controller.signal,
            });
            
            const res = await result.json();
            setIsAuthChecked(true);
            if (!res.success) return setUser(null);
            clearTimeout(timeoutId);
            setUser(res.data);
        } catch (error) {
            clearTimeout(timeoutId);
            setIsAuthChecked(true);
            setUser(null);
        }
    };

    useEffect(() => {
        handleCheckAuth();
    }, []);

    if (!isAuthChecked) {
        return <h1>Checking auth....</h1>; /* Add loading spinner */
    }

    if (isProtected && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isProtected && user) {
        return <Navigate to="/" replace />;
    }

    return (
        <Suspense fallback={<h1>Loading....</h1> /* Add loading spinner */}>
            <Outlet />
        </Suspense>
    );
}
