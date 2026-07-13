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

## Deployment boundary

- `contourna.com` and `www.contourna.com`: this Vercel project
- `app.contourna.com`: authenticated product project
- `/playground`: public acquisition flow using the shared backend API

Keep Clerk, Apollo, authenticated providers, and product-only environment values
out of this repository.
