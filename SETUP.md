# Marketing setup

## Requirements and environment

Use Node 24 and npm. This standalone Next.js app serves `contourna.com`; it does
not need product Clerk keys or Apollo providers to render marketing pages.

In the main checkout, create `.env.local` from `.env.example` only when absent.
It is the shared file linked by con. Personal overrides belong in
`.env.development.local`. If using the team dev vault, run `az login` and
`con secrets pull`; it fills matching existing keys only.

The template points the playground API at staging. To use a configured local
backend, set `NEXT_PUBLIC_API_URL=http://localhost:4000/api`. Set
`NEXT_PUBLIC_APP_URL=http://localhost:3001` for local product links.
The public Turnstile site key must match the selected backend's secret/allowed
hostnames. Leave playground generation untested until its backend is configured;
ordinary page rendering does not need an AI call. Do not enable bypasses or
consume quota as a routine setup check.

## Install and run

```sh
npm ci
npm run dev -- --port 3000
```

Open `http://localhost:3000`. Product web uses :3001. Restart Next after env changes.

## Verify

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Also run `npm audit --omit=dev --audit-level=high` for CI parity. Inspect the rendered
home page and navigation. The playground navigation regression check requires a
production build; it does not submit generation or consume quota:

```sh
npm run build
npm start -- --port 3101
# In another terminal:
node scripts/check-playground-navigation.mjs http://localhost:3101
```

The check uses `agent-browser`, downloaded by npx on first use, and needs its real
browser runtime. It covers wizard navigation, values, Back/Forward, reset and direct
links. Missing browser tooling means that check is unverified.

## Troubleshooting and boundaries

- Port occupied: inspect the process owner or choose another port.
- Playground API failure: check the selected backend, Turnstile hostname and API URL.
- Product sign-in belongs to the separate frontend at :3001 / `app.contourna.com`.
- All `NEXT_PUBLIC_*` values ship to the browser. Never add server secrets here.

## Workstations and daily work

For cloning all repos, installing `con` and shared agent instructions, Azure access,
and the complete startup order, follow the [workstation guide](https://github.com/Contourna-SaaS/con/blob/main/SETUP.md).
The [one-shot setup prompt](https://github.com/Contourna-SaaS/con/blob/main/SETUP-PROMPT.md) asks an agent to perform and
verify that setup, preserving existing checkouts and configuration.

For ticket work, use `con new --no-cmux` in any terminal, or `con new` for the
optional cmux layout. Use `--fresh --name <name>` for unticketed work. Worktrees
live under `~/workspace/.worktrees/<workspace>/`; make source changes there.
Terminal mode prints the checkout paths; run `npm ci` in each selected repo and
start the apps yourself. cmux opens repo tabs with dependency installation.

Env files are shared symlinks: create or update them in the main checkout, then run
`con env <workspace>`. Do not overwrite a worktree env file. Coding agents and the
shared agent instructions are optional; see the workstation guide if using them.
