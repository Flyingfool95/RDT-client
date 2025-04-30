import { ReactElement, useState } from "react";

function Modal({ children, buttonContent }: { children: ReactElement; buttonContent: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="modal-trigger" onClick={() => setIsOpen(true)}>
                {buttonContent}
            </button>
            {isOpen && <div className="modal-content">{children}</div>}
        </>
    );
}

export default Modal;
