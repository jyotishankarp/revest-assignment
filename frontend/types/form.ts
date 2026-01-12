export type FieldType = "TEXT" | "LIST" | "RADIO";

export interface FormField {
  id: number;
  name: string;
  fieldType: FieldType;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required: boolean;
  listOfValues1?: string[];
}

export interface FormData {
  data: FormField[];
}

export interface FormValues {
  [key: string]: string;
}
