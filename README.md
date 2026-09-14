# Contourna Marketing

Standalone Next.js marketing application for `contourna.com`. The authenticated
product remains independently deployed from `contourna-frontend`.

## Development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

The playground navigation smoke check runs in a real browser with `agent-browser`
(downloaded by `npx` on first use). Run it against a **production build**: the
original step-navigation regression did not reproduce in the development server.

```bash
npm run build
npm start -- --port 3101
# In another terminal:
node scripts/check-playground-navigation.mjs http://localhost:3101
```

It checks the wizard, edited values, browser Back/Forward, reset, and direct links.
It does not submit a generation or consume quota.

## Deployment boundary

- `contourna.com` and `www.contourna.com`: this Vercel project
- `app.contourna.com`: authenticated product project
- `/playground`: public acquisition flow using the shared backend API

Keep Clerk, Apollo, authenticated providers, and product-only environment values
out of this repository.
