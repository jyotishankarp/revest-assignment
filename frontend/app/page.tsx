import SignupForm from "@/components/SignupForm";
import formFieldsData from "@/data/formFields.json";
import { FormData } from "@/types/form";
import { Box } from "@mui/material";

export default function Home() {
  const formData = formFieldsData as FormData;

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <SignupForm fields={formData.data} />
    </Box>
  );
}
