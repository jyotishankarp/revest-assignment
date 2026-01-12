# Dynamic Signup Form Application

A responsive Next.js application with TypeScript that creates dynamic form components based on JSON configuration.

## Quick Start Guide

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation & Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open browser:**

   ```text
   http://localhost:4000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## Requirements Coverage

### ✅ Requirement 1: Signup Form with 3 Fields

- **Full Name** (TEXT field)
- **Email** (TEXT field with email validation)
- **Gender** (LIST field, can be changed to RADIO)

**Location:** `data/formFields.json`

### ✅ Requirement 2: Form Validation (React Hook Form)

- Required field validation
- Min/Max length validation for TEXT fields
- Email format validation (automatic for "Email" field)
- Real-time error messages
- Form prevents submission with invalid data

**Implementation:** `components/SignupForm.tsx`, `components/DynamicFormField.tsx`

### ✅ Requirement 3: Dynamic Fields Based on JSON

- Form fields loaded from `data/formFields.json`
- All fields rendered dynamically
- Supports all JSON properties: `id`, `name`, `fieldType`, `minLength`, `maxLength`, `defaultValue`, `required`, `listOfValues1`
- Form updates automatically when JSON changes

**JSON Structure:**

```json
{
  "id": 1,
  "name": "Full Name",
  "fieldType": "TEXT",
  "minLength": 1,
  "maxLength": 100,
  "defaultValue": "John Doe",
  "required": true
}
```

### ✅ Requirement 4: Dynamic Component Rendering

#### 4a. Change Field Type (TEXT ↔ LIST ↔ RADIO)

- Change `fieldType` from "TEXT" to "LIST" → Renders Select/Dropdown
- Change `fieldType` from "TEXT" to "RADIO" → Renders Radio buttons
- Change `fieldType` from "LIST" to "RADIO" → Works (and vice versa)
- All props (label, defaultValue, required) work with all field types

#### 4b. Change Label Name

- Change `name` property → Label updates immediately
- Example: "Full Name" → "Name" works perfectly

#### 4c. Make Field Mandatory/Optional

- Change `required: true` to `false` → Field becomes optional
- Change `required: false` to `true` → Field becomes mandatory
- Required fields show asterisk (*) indicator

#### 4d. Default Values

- `defaultValue` property works for all field types
- Default values populate on form load

**Test:** Edit `data/formFields.json` and change any property - form updates automatically!

### ✅ Requirement 5: Material UI Styling & Responsiveness

- Material UI library integrated
- Visually appealing interface
- Responsive design (Mobile, Tablet, Desktop)
- Consistent styling across all components

**Components Used:** Container, Paper, TextField, Select, RadioGroup, Button, Alert

### ✅ Requirement 6: Data Persistence (LocalStorage)

- Form submissions saved to browser's localStorage
- Data persists across browser sessions
- Multiple submissions accumulate with timestamps
- View stored data: Open browser console and run:

  ```javascript
  localStorage.getItem('signup_form_data')
  ```

**Implementation:** `utils/storage.ts`

---

## Customizing Form Fields

Edit `data/formFields.json` to customize the form:

### Change Field Type

```json
{
  "name": "Gender",
  "fieldType": "RADIO",  // Change from "LIST" to "RADIO"
  "listOfValues1": ["Male", "Female", "Others"]
}
```

### Change Label

```json
{
  "name": "Name"  // Changed from "Full Name"
}
```

### Make Field Optional

```json
{
  "required": false  // Changed from true
}
```

### Add/Remove Fields

- Add a new field object to the `data` array
- Remove a field by deleting its object
- Ensure each field has a unique `id`

---

## Project Structure

```text
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Material UI ThemeProvider
│   ├── page.tsx            # Main page that loads JSON and renders form
│   └── globals.css
├── components/
│   ├── SignupForm.tsx      # Main form component
│   ├── DynamicFormField.tsx # Dynamic field renderer
│   └── ThemeProvider.tsx   # Material UI theme
├── data/
│   └── formFields.json     # JSON configuration
├── types/
│   └── form.ts             # TypeScript types
├── utils/
│   └── storage.ts          # localStorage utilities
└── package.json
```

---

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **React Hook Form** - Form validation
- **Material UI** - UI components
- **Zod** - Schema validation (installed)

---

## Known Issues & Troubleshooting

### Hydration Error (Causing due to library)

During development, we encountered a hydration error when using inline styles with Material UI components in Next.js server components. This is a known issue with Emotion (used by Material UI) and Next.js.

**Error:** `Hydration failed because the server rendered HTML didn't match the client`

**Related Issue:** This is a known issue with Emotion and Next.js. For more details, see: [emotion-js/emotion#3153](https://github.com/emotion-js/emotion/issues/3153)

---

## All Requirements Status

- Done: Signup form with 3 fields (Full Name, Email, Gender)
- Done: React Hook Form validation
- Done: Dynamic fields from JSON
- Done: Dynamic component rendering (TEXT/LIST/RADIO)
- Done: Label changes work dynamically
- Done: Required/Optional toggle works
- Done: Material UI styling and responsiveness
- Done: LocalStorage data persistence
- Done: README with setup instructions
- Done: Clean, modular, scalable code

---
