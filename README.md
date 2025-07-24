# React Deno Template – Client

This template is designed to work out of the box with [RDT - Server](https://github.com/Flyingfool95/RDT-server).

Its purpose is to provide a starting point for web applications with the following features already set up:

## 🚀 Features

-   **[Vite](https://vitejs.dev/)** – Fast development build tool and dev server
-   **TypeScript** – Strongly typed codebase for better developer experience
-   **[TanStack Query](https://tanstack.com/query/latest)** – Powerful data fetching, caching, and synchronization
-   **[Zustand](https://github.com/pmndrs/zustand)** – Lightweight state management (currently used for user data; migration to TanStack Query planned)
-   **Image optimization** via [`browser-image-compression`](https://www.npmjs.com/package/browser-image-compression)

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Flyingfool95/RDT-client.git my-new-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Dev Server

```bash
npm run dev
```

---

## ⚙️ Configuration
Copy the ```.env.example``` file and rename it to ```.env.local``` and add the URL for the server. If you're using the [RDT - Server](https://github.com/Flyingfool95/RDT-server) repo it should be ```http://localhost:8000``` while developing.
```bash
VITE_API_BASE_URL=
```

---

## 📁 File Structure

```
├── src/
│   ├── core/
│   ├── features/
│   ├── routes/
├── public/
├── .env.example
├── package.json
└── README.md
```

---

## 🧪 Scripts

| Script          | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Starts dev server      |
| `npm run build` | Builds for production  |
| `npm run lint`  | Lints code (if set up) |

---

## 📦 Technologies

-   [Deno / Node.js / React / Tailwind / etc.]
-   [Other libraries or tools you're using]

---

## 📄 License

MIT — feel free to use and modify.

---

## 🙋‍♂️ Author

Made by [Your Name](https://github.com/your-username)  
Feedback welcome! ⭐
