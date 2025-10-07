import "./ModalWithForm.css";
import closeIcon from "../../assets/close-button.svg";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__title">New Garment</h2>
        <button type="button" className="modal__close">
          <img src={closeIcon} alt="Close Icon" />
        </button>
        <form className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image Url"
            />
          </label>
          <fieldset className="modal__weather-buttons">
            <legend className="modal__weather-type-legend">
              Select the weather type:
            </legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input id="hot" type="radio" name="weather" className="modal__radio-input" />
              <span>Hot</span>
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input id="warm" type="radio" name="weather" className="modal__radio-input" />{" "}
              <span>Warm</span>
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" name="weather" className="modal__radio-input" />{" "}
              <span>Cold</span>
            </label>
          </fieldset>
          <button type="submit" className="modal__submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
