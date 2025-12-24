import { useEffect, useMemo } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ activeModal, onClose, onLogin, onSwitchToRegister }) {
  const initialForm = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const { values, errors, isValid, handleChange, handleReset } =
    useFormWithValidation(initialForm);

  useEffect(() => {
    if (activeModal === "login") {
      handleReset();
    }
  }, [activeModal, handleReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values, handleReset);
  }

  function handleClose() {
    handleReset();
    onClose();
  }

  return (
    <ModalWithForm
      name="login"
      titleText="Log In"
      buttonText="Log In"
      activeModal={activeModal}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
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
          minLength="8"
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <div className="modal__alt-actions">
        <span>Or </span>
        <button
          type="button"
          className="modal__alt-link"
          onClick={() => {
            onClose();
            onSwitchToRegister();
          }}
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
