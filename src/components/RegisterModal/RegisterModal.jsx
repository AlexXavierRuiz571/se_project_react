import { useEffect, useMemo } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function RegisterModal({ activeModal, onClose, onRegister }) {
  const initialForm = useMemo(
    () => ({
      name: "",
      avatar: "",
      email: "",
      password: "",
      minLength: 8,
    }),
    []
  );

  const { values, errors, isValid, handleChange, handleReset } =
    useFormWithValidation(initialForm);

  // Reset the form each time the register modal is opened
  useEffect(() => {
    if (activeModal === "register") {
      handleReset();
    }
  }, [activeModal, handleReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      evt.target.reportValidity?.();
      return;
    }

    onRegister(values, handleReset);
  }

  function handleClose() {
    handleReset();
    onClose();
  }

  return (
    <ModalWithForm
      name="register"
      titleText="Sign up"
      buttonText="Sign up"
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
          autoComplete="name"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
          autoComplete="url"
        />
        {errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>

      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
          autoComplete="email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
