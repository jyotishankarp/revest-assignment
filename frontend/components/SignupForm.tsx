"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FormField, FormValues } from "@/types/form";
import DynamicFormField from "./DynamicFormField";
import { saveFormData } from "@/utils/storage";

interface SignupFormProps {
  fields: FormField[];
}

export default function SignupForm({ fields }: SignupFormProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create default values from fields
  const defaultValues: FormValues = fields.reduce((acc, field) => {
    const fieldName = field.name.toLowerCase().replace(/\s+/g, "_");
    acc[fieldName] = field.defaultValue || "";
    return acc;
  }, {} as FormValues);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Save to localStorage
      saveFormData(data);
      setSubmitStatus({
        type: "success",
        message: "Form submitted successfully! Data saved to local storage.",
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        reset(defaultValues);
        setSubmitStatus({ type: null, message: "" });
      }, 3000); // 3 seconds only to show the success message
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to save form data. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Please fill in all required fields
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <DynamicFormField
              key={field.id}
              field={field}
              control={control}
              errors={errors}
            />
          ))}

          {submitStatus.type && (
            <Alert
              severity={submitStatus.type}
              sx={{ mb: 2 }}
              onClose={() => setSubmitStatus({ type: null, message: "" })}
            >
              {submitStatus.message}
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ minWidth: 150 }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
