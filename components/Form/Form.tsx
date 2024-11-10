import { useCallback, useState } from "react";

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<any | void> | any | void;
  validate: Partial<
    Record<keyof T, (value: T[keyof T], values: T) => string | undefined>
  >;
  children: (params: {
    values: T;
    handleChange: (key: keyof T) => (value: T[keyof T]) => void;
    handleSubmit: () => void;
    errors: Record<keyof T, string>;
    touched: Record<keyof T, boolean>;
    canSubmit: boolean;
    isSubmitting: boolean;
  }) => React.ReactNode;
  validationOrder?: (keyof T)[];
}
const Form = <T extends object>({
  initialValues,
  onSubmit,
  validate,
  children,
  validationOrder,
}: FormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  //validate initial values
  const initialErrors: Record<keyof T, string> = Object.fromEntries(
    Object.keys(initialValues).map((key) => [
      key,
      (validate as any)[key]?.((initialValues as any)[key]) || "",
    ])
  ) as any;
  const [errors, setErrors] = useState<Record<keyof T, string>>(initialErrors);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);
  const [submitting, setSubmitting] = useState(false);
  const [dirty, setDirty] = useState(false);
  const handleChange = useCallback(
    (key: keyof T) => (value: T[keyof T]) => {
      setDirty(true);
      setValues((prev) => ({ ...prev, [key]: value }));
      setTouched((prev) => ({ ...prev, [key]: true }));
      setErrors((prev) => ({
        ...prev,
        [key]: validate[key]?.(value, values) || "",
      }));
    },
    [setValues, setTouched, setErrors, validate, values]
  );
  const handleSubmit = useCallback(async () => {
    setDirty(true);
    const newErrors: Record<keyof T, string> = {} as any;
    const order = validationOrder || (Object.keys(values) as (keyof T)[]);
    for (const key of order) {
      const error = validate[key]?.(values[key], values);
      if (error) {
        newErrors[key] = error;
      }
    }
    //set touched to true for all fields
    setTouched(Object.fromEntries(order.map((key) => [key, true])) as any);
    setErrors(newErrors);
    if (Object.values(newErrors).every((e) => !e)) {
      setSubmitting(true);
      await onSubmit?.(values);
      setSubmitting(false);
    }
  }, [values, validate, onSubmit, validationOrder]);
  const canSubmit =
    !dirty ||
    (Object.values(errors).every((e) => !e) &&
      Object.values(touched).every((e) => !e));

  return (
    <>
      {children({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        canSubmit,
        isSubmitting: submitting,
      })}
    </>
  );
};

export default Form;
