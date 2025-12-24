import "./ItemModal.css";
import closeIcon from "../../assets/close-button.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onOpenConfirm }) {
  const currentUser = useContext(CurrentUserContext);

  const isOpen = activeModal === "preview";
  if (!isOpen || !card || !card.name) return null;

  const imageSrc = card.link ?? card.imageUrl ?? "";

  const ownerId = card.owner?._id ?? card.owner;
  const currentUserId = currentUser?._id;

  const isOwn = Boolean(currentUserId && ownerId && ownerId === currentUserId);

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__container_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close Icon" />
        </button>

        <img src={imageSrc} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather-type">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              className="item-modal__delete"
              onClick={onOpenConfirm}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
