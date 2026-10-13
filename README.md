# StudentSpend — Student Expense Tracker

StudentSpend is a responsive student finance dashboard adapted from the supplied TailAdmin React/Vite template. It keeps the existing Vite, React 19, TypeScript router/host, Tailwind CSS, and installed dependencies. The StudentSpend feature itself is written in JavaScript and JSX.

## Run in VS Code

1. Extract/open this `studentspend` folder in VS Code (`File → Open Folder…`).
2. Install Node.js 20.19+ or 22.12+.
3. Open **Terminal → New Terminal** and run:

   ```powershell
   npm ci
   npm run dev
   ```

4. Open the `Local` URL printed by Vite, usually `http://localhost:5173/`.

To create a production build, run `npm run build`. To lint, run `npm run lint`.

## Frontend behavior

- Add, edit, delete, search, and filter expense transactions by category and date.
- Set the monthly budget with the pencil icon in the budget card.
- Sign in or create a student profile with name, email, school, program, and year of study; edit those details from **My profile**.
- The login is a frontend demo flow only until the backend team provides an authentication API. Passwords are validated in memory and never saved.
- Demo transactions and budget persist in this browser's local storage.
- Currency is currently USD in the sample display and can be changed in `src/StudentSpend.jsx`.
- No Recharts package was added; the two charts use CSS and existing React only.

## Backend connection

API calls belong in `src/services/api.js`. Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` when the backend is ready. Agree route paths, authentication, and exact response bodies with the backend teammate first; this frontend does not guess or call API endpoints. See [API_CONTRACT.md](API_CONTRACT.md) for the required capabilities and data shapes.

## Main files

- `src/StudentSpend.jsx` — login/create-account flow, student profile, dashboard UI, interactions, demo data, and local persistence.
- `src/studentspend.css` — responsive StudentSpend styling.
- `src/services/api.js` — environment-aware generic REST transport.
- `src/App.tsx` — replaces the template's ecommerce dashboard route with StudentSpend.
- `tsconfig.app.json` — permits the new JSX/JavaScript files alongside the template's TypeScript host.
- `index.html` — page title and description.
- `.env.example`, `API_CONTRACT.md` — backend configuration example and teammate contract.

## Known limitations

The project is in demo mode until the backend teammate confirms routes and auth. The starter template's existing `npm run lint` has errors in untouched calendar, vector-map, theme/sidebar, and SVG declaration files; the production build passes.
