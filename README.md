# 🧩 Drag-and-Drop Form Builder

A dynamic, reusable, and interactive drag-and-drop form builder built using **React DnD**, **Tailwind CSS**, and **Node.js**. Users can build custom forms by dragging components like inputs, checkboxes, radios, etc., save the schema as JSON, preview the form, and submit mock data.

---

## 🚀 Features

- 🟦 Drag-and-drop form components
- 🧩 Reorder and remove fields
- 📦 Save and load form schemas (JSON-based)
- 👁️ Live preview before submission
- 📤 Submit mock data (simulated API call)
- 🎨 Responsive and accessible UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend**: React, React DnD, Tailwind CSS
- **Backend**: Node.js, Express (for form schema save/load & mock submission)
- **Storage**: In-memory or JSON file (for demo)
- **Other**: UUID, Zustand/Redux (for form state)

---

## 📸 Demo

> _Add a GIF or screenshot here after completion_

---

## ✅ Development Checklist

### 🔧 Project Setup
- [] Initialize React + Vite or CRA
- [] Setup Tailwind CSS
- [] Integrate React DnD
- [ ] Setup Node.js + Express backend with CORS
- [ ] Create folder structure for components, services, and utilities

---

### 🧩 UI Components
- [] Draggable palette: Input, Checkbox, Radio, Textarea, Dropdown
- [] Dropzone (form builder area)
- [] Component preview with delete & reorder
- [] Live form preview
- [ ] Form submission mock handler

---

### 🧠 State Management
- [] Use Zustand/Redux to manage components in builder
- [ ] Generate & store form schema as JSON
- [ ] Load saved schema (simulate DB or localStorage)

---

### 📤 Backend API (Node.js)
- [ ] POST `/submit-form` – simulate form data save
- [ ] POST `/save-schema` – save schema to memory or file
- [ ] GET `/load-schema` – load saved schema

---

### 🎨 Styling & UX
- [] Responsive drag-and-drop interface
- [] Tailwind-based clean layout
- [ ] Toasts or status messages (e.g., success, errors)
- [ ] Loader/spinner during API call

---

### 📦 Bonus Features (Optional)
- [ ] User authentication (JWT)
- [ ] Export schema as downloadable `.json`
- [ ] Import form schema from `.json`
- [ ] Real backend integration (MongoDB/Postgres)


---

## 🧪 Testing Ideas
- [ ] Drag and drop functionality
- [ ] Schema accuracy after field manipulation
- [ ] API response for schema save/load
- [ ] Input validation in preview mode

---

## 💡 Inspiration

- [Typeform](https://www.typeform.com/)
- [Form.io](https://form.io/)
- [Google Forms]

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by [Your Name](https://github.com/yourhandle)
