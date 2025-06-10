import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import RouteGuard from "./features/auth/components/RouteGuard";
import NotificationList from "./features/notifications/components/NotificationList";

import Login from "./routes/auth/Login";
import AppNavigation from "./features/app-navigation/components/AppNavigation";
import Register from "./routes/auth/Register";
import ResetPassword from "./routes/auth/ResetPassword";

const Dashboard = lazy(() => import("./routes/protected/Dashboard"));
const Profile = lazy(() => import("./routes/protected/Profile"));

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
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
            <NotificationList />
        </div>
    );
}

export default App;
