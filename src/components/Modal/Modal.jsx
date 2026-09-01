function Modal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-card">

                <div className="modal-icon">
                    !
                </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-actions">

                    <button
                        type="button"
                        className="modal-cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="modal-delete-button"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Modal;