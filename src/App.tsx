import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./core/styles/App.css";
import "./core/styles/Utils.css";

import Login from "./routes/auth/login/Login";

import NotificationList from "./core/features/notifications/NotificationList";
import Register from "./routes/auth/register/Register";
import ResetPassword from "./routes/auth/reset-password/ResetPassword";
import RouteGuard from "./core/layouts/route-guard/RouteGuard";
import AppNavigation from "./core/layouts/app-navigation/AppNavigation";
import ProtectedLayout from "./core/layouts/protected-layout/ProtectedLayout";

const Dashboard = lazy(() => import("./routes/protected/dashboard/Dashboard"));
const Profile = lazy(() => import("./routes/protected/profile/Profile"));

function App() {

    return (
        <div id="app">
            <Routes>
                {/* Public Routes */}
                <Route element={<RouteGuard isProtected={false} />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<RouteGuard isProtected={true} />}>
                    <Route element={<AppNavigation />}>
                        <Route element={<ProtectedLayout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="/*" element={<h1>404</h1>} />
            </Routes>
            <NotificationList />
        </div>
    );
}

export default App;
