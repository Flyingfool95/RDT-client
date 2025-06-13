export type TypeResponse<T = unknown> = {
    data: T;
    errors: string[];
    message: string;
    success: boolean;
};

export type TypeUseModalStore = {
    showModal: boolean;
    setShowModal: (isShow: boolean) => void;
};
