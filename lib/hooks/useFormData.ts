// useFormData.ts
import { useState } from "react";
import { FormFields } from "@/lib/types/toolconfig";

export const useFormData = (initialFields: FormFields[]) => {
  const initialState = initialFields.reduce(
    (acc: { [key: string]: string }, field: FormFields) => {
      acc[field.name!] = field.initialValue || ""; // Provide a default empty string if initialValue is undefined
      return acc;
    },
    {}
  );

  const [formData, setFormData] = useState<{ [key: string]: string }>(
    initialState
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    fieldName: string
  ) => {
    setFormData((prevState) => ({ ...prevState, [fieldName]: e.target.value }));
  };

  return [formData, handleChange] as const;
};
