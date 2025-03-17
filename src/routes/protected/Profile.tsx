import { useNavigate } from "react-router-dom";
import useAuthStore from "../../features/auth/store/useAuthStore";
import useNotificationStore from "../../features/notifications/store/useNotificationStore";

export default function Profile() {
    const { user, setUser } = useAuthStore((state) => state);
    const { addNotification } = useNotificationStore((state) => state);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!user) return addNotification({ message: "User do not exist", type: "error", duration: 5000 });

        const results = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id: user.id }),
        });

        if (results.status === 200) {
            addNotification({ message: "User deleted successfully", type: "success", duration: 5000 });
            setUser(null);
            navigate("/login");
        }
    };

    return (
        <main>
            <h1>Profile</h1>
            <button onClick={handleDelete}>Delete my account</button>
        </main>
    );
}
