import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Loader from "../../loader/components/Loader";
import { convertPixelDataToImage } from "../../shared/helpers";

export default function RouteGuard({ isProtected }: { isProtected: boolean }) {
    const publicOnlyPaths = ["/login", "/register"];

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

            clearTimeout(timeoutId);

            if (!res.success) {
                setUser(null);
            } else {
                setUser({
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    image: await convertPixelDataToImage(res.data.image),
                });
            }
        } catch (error) {
            clearTimeout(timeoutId);
            setUser(null);
        } finally {
            setIsAuthChecked(true);
        }
    };

    useEffect(() => {
        if (!isAuthChecked) {
            handleCheckAuth();
        }
    }, [isAuthChecked]);

    if (!isAuthChecked) {
        return <Loader />;
    }

    if (isProtected && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isProtected && user && publicOnlyPaths.includes(location.pathname)) {
        return <Navigate to="/" replace />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    );
}
