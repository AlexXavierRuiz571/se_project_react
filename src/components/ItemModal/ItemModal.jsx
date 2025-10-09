import "./ItemModal.css";
import closeIcon from "../../assets/close-button.svg";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__container_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close Icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather-type">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
