import Dashboard from "../features/dashboard/pages/Dashboard";
import Profile from "../features/profile/pages/Profile";
import AppLayout from "../layouts/AppLayout";

export const appRoutes = [
    {
        path: "/",
        Component: AppLayout,
        children: [
            {
                index: true,
                Component: Dashboard,
            },
            {
                path: "profile",
                Component: Profile,
            },
        ],
    },
];
