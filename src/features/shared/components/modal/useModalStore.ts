import { create } from "zustand";

const useModalStore = create((set) => ({
    showModal: false,
    setShowModal: (isShow: boolean) => {
        set(() => ({
            showModal: isShow,
        }));
    },
}));

export default useModalStore;
