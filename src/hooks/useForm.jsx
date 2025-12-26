import { useState, useCallback } from "react";

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((evt) => {
    const { name, value, validationMessage, validity, form } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validity.valid ? "" : validationMessage,
    }));

    if (form) setIsValid(form.checkValidity());
  }, []);

  const handleReset = useCallback(
    (next = initialValues) => {
      setValues(next);
      setErrors({});
      setIsValid(false);
    },
    [initialValues]
  );

  const setFormValues = useCallback((next) => {
    setValues(next);
    setErrors({});
    setIsValid(false);
  }, []);

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleReset,
    setFormValues,
    setErrors,
    setIsValid,
  };
}

export { default } from "./useFormWithValidation.jsx";
