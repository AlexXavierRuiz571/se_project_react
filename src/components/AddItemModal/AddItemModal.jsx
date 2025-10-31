import { useEffect, useMemo } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function AddItemModal({ activeModal, onClose, onAddItem }) {
  const initialForm = useMemo(
    () => ({
      name: "",
      imageUrl: "",
      weather: "",
    }),
    []
  );

  const { values, errors, isValid, handleChange, handleReset } =
    useFormWithValidation(initialForm);

  // Reset the form each time the add-garment modal is opened
  useEffect(() => {
    if (activeModal === "add-garment") {
      handleReset();
    }
  }, [activeModal, handleReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      evt.target.reportValidity?.();
      return;
    }
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
      isDisabled={!isValid}
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
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Image
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
          autoComplete="url"
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
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
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
