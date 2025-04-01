import { create } from "zustand";
import { INotificationStore } from "../../../../types/notifications";

const useNotificationStore = create<INotificationStore>((set, get) => ({
    notifications: [],

    addNotification: (
        message: string,
        type: "info" | "error" | "warning" | "success" = "info",
        duration: number = 5000
    ) => {
        const id = new Date().getTime();
        set((state) => ({
            notifications: [...state.notifications, { id, message, type, duration }],
        }));

        setTimeout(() => {
            get().removeNotification(id);
        }, duration);
    },

    removeNotification: (id: number) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
    },
}));

export default useNotificationStore;
