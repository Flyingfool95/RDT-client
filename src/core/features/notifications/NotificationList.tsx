import "./notifications.css";
import { Notification } from "./types";
import useNotificationStore from "./useNotificationStore";

export default function NotificationList() {
    const { notifications, removeNotification } = useNotificationStore((state) => state);

    return (
        <div className="notification-container">
            {notifications.map((notification: Notification) => (
                <div key={notification.id} className={`notification ${notification.type}`}>
                    {notification.message.split("\n").map((msg: string, index: number) => (
                        <p key={index}>{msg}</p>
                    ))}

                    <button onClick={() => removeNotification(notification.id)}></button>
                </div>
            ))}
        </div>
    );
}
