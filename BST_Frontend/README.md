## BST_Frontend (Next.js 16 + TS)

### What you need to install

1. Node.js 20 LTS (recommended)
   - Includes npm
2. Git (optional, for version control)

Check versions (Windows PowerShell):

```powershell
node -v
npm -v
```

### Install project dependencies

```powershell
cd .\BST_Frontend

npm install
```

This installs:

- next@16, react@19, react-dom@19
- lucide-react (icons)
- typescript, eslint, @types/\* (dev)

Fonts: Montserrat (headings) and Lora (body) are loaded with `next/font` — no manual install needed.

### Run the app

```powershell
npm run dev
```

Open http://localhost:3000

### Build and start (production)

```powershell
npm run build
npm run start
```

### Project structure highlights

- `src/app/layout.tsx`: Global layout (sidebar, topbar, footer)
- `src/components/`: Navbar, Topbar, Footer, etc.
- `src/styles/variables.css`: Color tokens (primary/accent/background)
- `src/styles/globals.css`: Global styles and responsive rules

### Troubleshooting

- If `npm run dev` fails, ensure Node >= 18.18 (prefer 20 LTS).
- Delete `node_modules` and `package-lock.json`, then reinstall:

```powershell
rimraf node_modules package-lock.json; npm install
```
