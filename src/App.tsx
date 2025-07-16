import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/Utils.css";

import Login from "./routes/auth/login/Login";

import RouteGuard from "./layouts/route-guard/RouteGuard";
import ProtectedLayout from "./layouts/protected-layout/ProtectedLayout";
import AppNavigation from "./layouts/app-navigation/AppNavigation";
import NotificationList from "./features/notifications/NotificationList";
import Register from "./routes/auth/register/Register";
import ResetPassword from "./routes/auth/reset-password/ResetPassword";

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
