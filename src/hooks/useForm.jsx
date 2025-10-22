import { useState, useCallback } from "react";

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const setFormValues = useCallback((next) => {
    setValues(next);
  }, []);

  return { values, handleChange, handleReset, setFormValues };
}
