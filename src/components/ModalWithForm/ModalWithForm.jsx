import "./ModalWithForm.css";
import closeIcon from "../../assets/close-button.svg";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  onClose,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__container">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="Close Icon" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
