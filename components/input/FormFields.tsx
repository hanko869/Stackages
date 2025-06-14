import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
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
    <div className="space-y-8">
      {fields.map((field) => (
        <div key={field.name} className="relative">
          <Label
            htmlFor={field.name}
            className="text-sm text-gray-600 font-medium mb-2 block"
          >
            {field.label}
            {field.required && <span className="text-primary ml-1">*</span>}
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
              className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 
                placeholder:text-gray-400 text-gray-900 focus:ring-2 focus:ring-primary/10 
                focus:border-primary/30 transition-all duration-200"
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
              className="w-full min-h-[120px] bg-gray-50/50 border border-gray-100 rounded-lg 
                px-4 py-3 placeholder:text-gray-400 text-gray-900 focus:ring-2 
                focus:ring-primary/10 focus:border-primary/30 transition-all duration-200"
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
              <SelectTrigger
                className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 
                  text-gray-900 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 
                  transition-all duration-200"
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="border-gray-100 rounded-xl overflow-hidden">
                <SelectGroup>
                  {field.options?.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="hover:bg-gray-50 focus:bg-gray-50 hover:text-gray-900 focus:text-gray-900 px-4 py-2.5 cursor-pointer"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
    </div>
  );
};
