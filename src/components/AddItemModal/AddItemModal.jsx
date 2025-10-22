import useForm from "../../hooks/useForm.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function AddItemModal({ activeModal, onClose, onAddItem }) {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const isFormValid =
    values.name.trim().length > 0 &&
    values.imageUrl.trim().length > 0 &&
    values.weather !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, handleReset);
  }

  function handleClose() {
    handleReset();
    onClose();
  }

  return (
    <ModalWithForm
      name="add-garment"
      titleText="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </label>

      <fieldset className="modal__weather-buttons">
        <legend className="modal__weather-type-legend">
          Select the weather type:
        </legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <span>Hot</span>
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
