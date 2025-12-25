import "./ModalWithForm.css";
import closeIcon from "../../assets/close-button.svg";
import { Children } from "react";

function ModalWithForm({
  name,
  children,
  buttonText,
  titleText,
  activeModal,
  onClose,
  onSubmit,
  isDisabled,
}) {
  const isOpen = activeModal === name;

  const childrenArray = Children.toArray(children);

  const lastChild = childrenArray[childrenArray.length - 1];

  const hasAltActions =
    lastChild &&
    typeof lastChild === "object" &&
    lastChild.props?.className &&
    String(lastChild.props.className).includes("modal__alt-actions");

  const mainFields = hasAltActions
    ? childrenArray.slice(0, -1)
    : childrenArray;

  const altActions = hasAltActions ? lastChild : null;

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{titleText}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close Icon" />
        </button>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {mainFields}

          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>

            {altActions}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
