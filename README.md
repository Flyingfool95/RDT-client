# RDT Client

A modern web application built with **Vite**, **React**, and **TypeScript**. This project provides a responsive and efficient client-side interface, featuring modular design and scalable architecture. Out of the box compatible with [RDT - Server](https://github.com/Flyingfool95/RDT-server).

## 🚀 Features

- ⚡️ Lightning-fast bundling with **Vite**
- 🎯 Type-safe development using **TypeScript**
- 🧱 Modular components and feature-based architecture
- 🧭 Built-in app navigation
- 🌐 Environment configuration support
- ✨ CSS styling with resets and modular styles

## 📁 Project Structure

```
RDT-client-main/
├── public/                 # Static assets
├── src/                    # Main application source
│   ├── features/           # Feature modules
│   ├── App.tsx            # Root component
│   ├── main.tsx           # App entry point
│   └── styles/             # App-wide styles
├── helpers/               # Utility and helper functions
├── .env.example           # Environment variable template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── ...
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/your-username/RDT-client.git
cd RDT-client
npm install
```

### Running the App

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`.

## 🧪 Scripts

- `npm run dev` – Start development server
- `npm run build` – Create a production build

## 🧰 Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Bundler**: Vite
- **Linting**: ESLint
- **Styling**: CSS

## 📄 Environment Variables

Create a `.env` file in the root directory using `.env.example` as a reference:

```env
VITE_API_URL=https://api.example.com
```

## 📃 License

[MIT](LICENSE)
