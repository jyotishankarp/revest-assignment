"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box,
} from "@mui/material";
import { FormField, FormValues } from "@/types/form";

interface DynamicFormFieldProps {
  field: FormField;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

export default function DynamicFormField({
  field,
  control,
  errors,
}: DynamicFormFieldProps) {
  const fieldName = field.name.toLowerCase().replace(/\s+/g, "_");
  const error = errors[fieldName];

  const renderField = () => {
    switch (field.fieldType) {
      case "TEXT":
        return (
          <Controller
            name={fieldName}
            control={control}
            defaultValue={field.defaultValue || ""}
            rules={{
              required: field.required
                ? `${field.name} is required`
                : false,
              minLength: field.minLength
                ? {
                    value: field.minLength,
                    message: `Minimum length is ${field.minLength} characters`,
                  }
                : undefined,
              maxLength: field.maxLength
                ? {
                    value: field.maxLength,
                    message: `Maximum length is ${field.maxLength} characters`,
                  }
                : undefined,
              pattern:
                field.name.toLowerCase() === "email"
                  ? {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }
                  : undefined,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                label={field.name}
                fullWidth
                required={field.required}
                error={!!error}
                helperText={error?.message as string}
                type={field.name.toLowerCase() === "email" ? "email" : "text"}
              />
            )}
          />
        );

      case "LIST":
        return (
          <Controller
            name={fieldName}
            control={control}
            defaultValue={field.defaultValue || ""}
            rules={{
              required: field.required
                ? `${field.name} is required`
                : false,
            }}
            render={({ field: controllerField }) => (
              <FormControl fullWidth required={field.required} error={!!error}>
                <InputLabel>{field.name}</InputLabel>
                <Select
                  {...controllerField}
                  label={field.name}
                  value={controllerField.value || ""}
                >
                  {field.listOfValues1?.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <FormHelperText>{error.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case "RADIO":
        return (
          <Controller
            name={fieldName}
            control={control}
            defaultValue={field.defaultValue || ""}
            rules={{
              required: field.required
                ? `${field.name} is required`
                : false,
            }}
            render={({ field: controllerField }) => (
              <FormControl
                component="fieldset"
                required={field.required}
                error={!!error}
                fullWidth
              >
                <FormLabel component="legend">{field.name}</FormLabel>
                <RadioGroup
                  {...controllerField}
                  row
                  value={controllerField.value || ""}
                >
                  {field.listOfValues1?.map((value, index) => (
                    <FormControlLabel
                      key={index}
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
                {error && (
                  <FormHelperText>{error.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      default:
        return null;
    }
  };

  return <Box sx={{ mb: 3 }}>{renderField()}</Box>;
}
