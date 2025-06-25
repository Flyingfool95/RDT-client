import { create } from "zustand";
import { TypeUseModalStore } from "../../types";

const useModalStore = create<TypeUseModalStore>((set) => ({
    showModal: false,
    setShowModal: (isShow: boolean) => {
        set(() => ({
            showModal: isShow,
        }));
    },
}));

export default useModalStore;
