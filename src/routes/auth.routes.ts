import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ResetPassword from "../features/auth/pages/ResetPassword";
import AuthLayout from "../layouts/AuthLayout";

export const authRoutes = [
    {
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register,
            },
            {
                path: "reset-password",
                Component: ResetPassword,
            },
        ],
    },
];
