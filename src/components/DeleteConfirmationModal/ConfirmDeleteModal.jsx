import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/close-button.svg";

export default function ConfirmDeleteModal({
  activeModal,
  onClose,
  onConfirm,
}) {
  const isOpen = activeModal === "confirm";
  if (!isOpen) return null;

  return (
    <div className="confirm-modal__overlay confirm-modal__overlay--open">
      <div className="confirm-modal__container">
        <button
          type="button"
          className="confirm-modal__close"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close Icon" />
        </button>

        <h3 className="confirm-modal__title">
          Are you sure you want to delete this item?
        </h3>
        <p className="confirm-modal__subtitle">This action is irreversible.</p>

        <button
          type="button"
          className="confirm-modal__delete"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="confirm-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
