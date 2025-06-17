# 🤖 Zerocode Chatbot

A responsive, customizable chatbot UI built with **React**, **TypeScript**, **TailwindCSS**, and **Material UI**.  
Includes authentication, theme toggling, prompt templates, PDF export, message editing, and more!

> ⚡ Built as part of the Zerocode Frontend Assignment

---

## 🌐 Live Demo

🔗 [View Live Project](https://resilient-daffodil-7ffe44.netlify.app/)

## Demo Credentials:

- Email: `test@demo.com`
- Password: `123456`

---

## 🖼️ Screenshots

### 💬 Chat Interface

![Chat Screenshot](./screenshots/chat-ui.png)

### 🔒 Auth Pages

![Login Screenshot](./screenshots/login.png)

---

## ✨ Features

- 🔐 **Authentication** (Register & Login pages)
- 🌙 **Light/Dark Mode** toggle (persistent)
- 💬 **Chat Interface**
  - Send & receive messages (mock bot replies)
  - Prompt template shortcuts
  - Timestamp on each message
  - Persistent chat history (localStorage)
- 📝 **Message Controls**
  - Inline **edit** & **delete**
  - Scroll-to-bottom on new messages
- 📄 **Export to PDF** (via `jsPDF`)
- 🧪 **Responsive Design** (mobile-friendly)
- 🚀 Built with Vite for fast dev and optimized builds

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| React + Vite     | Frontend framework & bundler   |
| TypeScript       | Type safety                    |
| TailwindCSS      | Utility-first styling          |
| MUI              | UI components (buttons, icons) |
| jsPDF            | Export chat as PDF             |
| File Saver       | Save PDF to local              |
| React Router DOM | Page routing                   |

---

## 📁 Project Structure

```

src/
│
├── assets/ # Static assets like logos
├── components/ # Reusable UI components
│ ├── ChatWindow\.tsx
│ ├── MessageBubble.tsx
│ ├── MessageInput.tsx
│ ├── PromptTemplates.tsx
│ ├── ProtectedRoute.tsx
│ └── ThemeToggle.tsx
│
├── context/
│ └── ThemeContext.tsx
│
├── pages/ # Route-based pages
│ ├── Chat.tsx
│ ├── Login.tsx
│ └── Register.tsx
│
├── utils/
│ ├── auth.ts
│ └── prompts.ts
│
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts

```

---

## ⚙️ Setup Instructions

### 📦 Install Dependencies

```bash
npm install
```

### 🧪 Run Dev Server

```bash
npm run dev
```

### 🛠️ Build for Production

```bash
npm run build
```

### 🔍 Preview Production Build

```bash
npm run preview
```

---

## 📦 Dependencies

```json
"dependencies": {
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@heroicons/react": "^1.0.6",
  "@mui/icons-material": "^7.1.1",
  "@mui/material": "^7.1.1",
  "file-saver": "^2.0.5",
  "jspdf": "^3.0.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2"
}
```

```json
"devDependencies": {
  "@eslint/js": "^9.25.0",
  "@types/react": "^19.1.2",
  "@types/react-dom": "^19.1.2",
  "@vitejs/plugin-react": "^4.4.1",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.25.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.19",
  "globals": "^16.0.0",
  "postcss": "^8.5.6",
  "tailwindcss": "^3.4.17",
  "typescript": "~5.8.3",
  "typescript-eslint": "^8.30.1",
  "vite": "^6.3.5"
}
```

---

## 🧠 Inspiration

This project is part of the Zerocode technical assignment to demonstrate frontend development skills using React + TypeScript + Tailwind + MUI.

---

## 🙌 Author

**Dibakar Parida**
📧 [Connect on LinkedIn](https://www.linkedin.com/in/dibakar-parida/)

---

> Feel free to clone, modify, and use for learning or projects. Contributions welcome!
