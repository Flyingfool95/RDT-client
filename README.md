# React Deno Template (RDT): Client

## Client side for [RDT - Server](https://github.com/Flyingfool95/RDT-server) that works out of the box.

Its purpose is to provide a starting point for web applications with the following tech used:

## Tech & packages

**[Vite](https://vitejs.dev/)**: Fast development build tool and dev server
**[TypeScript](https://www.typescriptlang.org/)**: Strongly typed codebase for better developer experience
**[React Router Dom](https://reactrouter.com/home)**: Declarative routing for React apps, enabling dynamic navigation, nested routes, and route-based component rendering
**[TanStack Query](https://tanstack.com/query/latest)**: Powerful data fetching, caching, and synchronization
**[Zustand](https://github.com/pmndrs/zustand)**: Lightweight state management (currently used for user data; migration to TanStack Query planned)
**[Image optimization](https://www.npmjs.com/package/browser-image-compression)** via `browser-image-compression`

## Configuration

Copy the `.env.example` file and rename it to `.env.local` and add the URL for the server. If you're using the [RDT - Server](https://github.com/Flyingfool95/RDT-server) repo it should be `http://localhost:8000` while developing.

```bash
VITE_API_BASE_URL=
```

## File Structure

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

## Scripts

| Script          | Description           |
| --------------- | --------------------- |
| `npm run dev`   | Starts dev server     |
| `npm run build` | Builds for production |

---

## Getting Started

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

## License

MIT — feel free to use and modify.

---

## Author

Made by [Flyingfool95](https://github.com/flyingfool95)
