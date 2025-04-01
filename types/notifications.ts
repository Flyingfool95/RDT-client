export interface INotification {
    id: number;
    message: string;
    type: "info" | "error" | "warning" | "success";
    duration: number;
}

export interface INotificationStore {
    notifications: INotification[];
    addNotification: (message: string, type?: "info" | "error" | "warning" | "success", duration?: number) => void;
    removeNotification: (id: number) => void;
}
