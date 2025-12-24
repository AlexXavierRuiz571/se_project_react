import { useEffect, useMemo } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function EditProfileModal({
  activeModal,
  onClose,
  currentUser,
  onUpdateUser,
}) {
  const initialForm = useMemo(
    () => ({
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    }),
    [currentUser]
  );

  const { values, errors, isValid, handleChange, handleReset } =
    useFormWithValidation(initialForm);

  useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      handleReset(initialForm, {}, true);
    }
  }, [activeModal, currentUser, initialForm, handleReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      evt.target.reportValidity?.();
      return;
    }

    onUpdateUser(
      {
        name: values.name.trim(),
        avatar: values.avatar.trim(),
      },
      handleReset
    );
  }

  function handleModalClose() {
    handleReset();
    onClose();
  }

  return (
    <ModalWithForm
      name="edit-profile"
      titleText="Change profile data"
      buttonText="Save"
      activeModal={activeModal}
      onClose={handleModalClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          placeholder="Name"
          required
          autoComplete="name"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Avatar*
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          placeholder="Avatar"
          required
          autoComplete="url"
        />
        {errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
