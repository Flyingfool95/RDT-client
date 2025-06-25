import "./notifications.css";
import useNotificationStore from "./useNotificationStore";

export default function NotificationList() {
    const { notifications, removeNotification } = useNotificationStore((state) => state);

    return (
        <div className="notification-container">
            {notifications.map((notification: any) => (
                <div key={notification.id} className={`notification ${notification.type}`}>
                    {notification.message.split("\n").map((msg: any, index: any) => (
                        <p key={index}>{msg}</p>
                    ))}

                    <button onClick={() => removeNotification(notification.id)}></button>
                </div>
            ))}
        </div>
    );
}
