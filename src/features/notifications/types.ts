export type TypeNotification = {
    id: number;
    message: string;
    type: "info" | "error" | "warning" | "success";
    duration: number;
};

export type TypeNotificationStore = {
    notifications: TypeNotification[];
    addNotification: (message: string, type?: "info" | "error" | "warning" | "success", duration?: number) => void;
    removeNotification: (id: number) => void;
};
