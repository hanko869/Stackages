import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { type FormFields } from "@/lib/types/toolconfig";

interface RenderFieldsProps {
  fields: FormFields[];
  formData: { [key: string]: string };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    fieldName: string
  ) => void;
}

export const RenderFields: React.FC<RenderFieldsProps> = ({
  fields,
  formData,
  handleChange,
}) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="mb-5 w-full">
          <Label
            htmlFor={field.name}
            className="block text-xs font-semibold mb-2"
          >
            {field.label}
          </Label>
          {field.type === "input" && (
            <Input
              value={formData[field.name!]}
              onChange={(e) => handleChange(e, field.name!)}
              type="text"
              required={field.required}
              placeholder={field.placeholder || "Enter text"}
              id={field.name}
              name={field.name}
              className="w-full"
            />
          )}

          {field.type === "textarea" && (
            <Textarea
              value={formData[field.name!]}
              onChange={(e) => handleChange(e, field.name!)}
              required={field.required}
              placeholder={field.placeholder || "Enter text"}
              id={field.name}
              name={field.name}
              className="p-2 text-xs w-full"
            />
          )}
          {field.type === "select" && (
            <Select
              value={formData[field.name!]}
              onValueChange={(value) =>
                handleChange(
                  {
                    target: { value } as any,
                  } as React.ChangeEvent<HTMLSelectElement>,
                  field.name!
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Please make a selection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{field.label}</SelectLabel>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
    </>
  );
};
