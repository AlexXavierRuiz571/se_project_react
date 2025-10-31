import { useCallback, useEffect, useRef, useState } from "react";

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // keep a stable reference to the initial values so reset can restore them
  const initialRef = useRef(initialValues);

  // update state when initialValues prop changes (e.g. modal reopened with defaults)
  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
    initialRef.current = initialValues;
  }, [initialValues]);

  const handleChange = useCallback((evt) => {
    const { name, type, checked, value, validationMessage, validity, form } =
      evt.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues((prev) => ({ ...prev, [name]: fieldValue }));

    setErrors((prev) => ({
      ...prev,
      [name]:
        validity && typeof validity.valid === "boolean"
          ? validity.valid
            ? ""
            : validationMessage
          : validationMessage || "",
    }));

    // prefer form.checkValidity if available (handles radio groups, required fields)
    if (form) {
      setIsValid(form.checkValidity());
    } else {
      // fallback: if validity exists use it, otherwise assume validity for this field
      setIsValid(!(validity && validity.valid === false));
    }
  }, []);

  // reset to provided values or to the stored initial values by default
  const handleReset = useCallback((next = initialRef.current) => {
    setValues(next);
    setErrors({});
    setIsValid(false);
  }, []);

  // compatibility helpers similar to previous useForm
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
