import Login from "../features/auth/components/Login";
import Register from "../features/auth/components/Register";
import ResetPassword from "../features/auth/components/reset-password/ResetPassword";
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
