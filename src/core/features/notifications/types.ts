export type Notification = {
    id: number;
    message: string;
    type: "info" | "error" | "warning" | "success";
    duration: number;
};

export type NotificationStore = {
    notifications: Notification[];
    addNotification: (message: string, type?: "info" | "error" | "warning" | "success", duration?: number) => void;
    removeNotification: (id: number) => void;
};
