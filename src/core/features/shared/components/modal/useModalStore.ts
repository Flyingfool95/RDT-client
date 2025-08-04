import { create } from "zustand";
import { ModalStore } from "./types";

const useModalStore = create<ModalStore>((set) => ({
    showModal: false,
    setShowModal: (isShow: boolean) => {
        set(() => ({
            showModal: isShow,
        }));
    },
}));

export default useModalStore;
