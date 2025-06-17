import { ReactElement, useEffect } from "react";
import "../styles/Modal.css";
import useModalStore from "../store/useModalStore";

function Modal({
    children,
    triggerText,
    triggerType,
    triggerClass,
}: {
    children: ReactElement;
    triggerText: string;
    triggerType: "button" | "image" | "text";
    triggerClass: string;
}) {
    const { showModal, setShowModal } = useModalStore((state) => state);
    let trigger;
    const open = () => setShowModal(true);

    const handleKeyboardClose = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setShowModal(false);
        }
    };
    const handleMouseClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener("keydown", handleKeyboardClose);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyboardClose);
        };
    }, [showModal]);

    useEffect(() => {
        return () => {
            setShowModal(false);
        };
    }, []);

    if (triggerType === "button") {
        trigger = (
            <button onClick={open} className={triggerClass}>
                {triggerText}
            </button>
        );
    } else if (triggerType === "image") {
        trigger = <img src={triggerText} alt="modal trigger" onClick={open} className={triggerClass} />;
    } else if (triggerType === "text") {
        trigger = (
            <p onClick={open} className={triggerClass}>
                {triggerText}
            </p>
        );
    }

    return (
        <>
            {trigger}
            {showModal && (
                <div className="modal-background" onMouseUp={(e) => handleMouseClose(e)}>
                    <div className="modal-content">{children}</div>
                </div>
            )}
        </>
    );
}

export default Modal;
