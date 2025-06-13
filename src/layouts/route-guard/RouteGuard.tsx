import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../features/auth/store/useAuthStore";
import { TypeUserResponse } from "../../features/auth/types";
import { customFetch } from "../../features/shared/helpers/customFetch";
import { convertPixelDataToImage } from "../../features/shared/helpers/helpers";
import Loader from "../../features/loader/components/Loader";

export default function RouteGuard({ isProtected }: { isProtected: boolean }) {
    const publicOnlyPaths = ["/login", "/register"];
    const location = useLocation();
    const { user, setUser, isAuthChecked, setIsAuthChecked } = useAuthStore((state) => state);

    const handleCheckAuth = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
            const results: TypeUserResponse = await customFetch(`/api/v1/auth/auth-check`, "GET", true);

            setUser({
                id: results.data.user.id,
                name: results.data.user.name,
                email: results.data.user.email,
                image: await convertPixelDataToImage(results.data.user.image),
            });
        } catch (error) {
            setUser(undefined);
        } finally {
            clearTimeout(timeoutId);
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
