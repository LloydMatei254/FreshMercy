# Fresh Mercy

> **Where Mercy Meets You**
>
> *"The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning."*
> — Lamentations 3:22–23

A full-stack, production-ready gospel ministry platform.

---

## Architecture

```
fresh-mercy/
├── apps/
│   ├── web/          # React 18 + TypeScript + Vite + Tailwind CSS
│   └── api/          # Node.js + Express + TypeScript
├── prisma/
│   ├── schema.prisma # Database schema
│   └── seed.ts       # Development seed data
├── .github/
│   └── workflows/
│       └── ci.yml    # GitHub Actions CI pipeline
├── .env.example      # Environment variable template
└── README.md
```

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS |
| State      | TanStack Query (React Query)        |
| Routing    | React Router v7                     |
| Forms      | React Hook Form + Zod               |
| Backend    | Node.js, Express, TypeScript        |
| Database   | PostgreSQL                          |
| ORM        | Prisma                              |
| Auth       | JWT (jsonwebtoken) + Argon2 hashing |
| Email      | Nodemailer (SMTP/Resend/SendGrid)   |
| Validation | Zod                                 |
| Logging    | Pino                                |
| Testing    | Vitest + Playwright                 |
| CI/CD      | GitHub Actions                      |

---

## Requirements

- **Node.js** ≥ 20
- **npm** ≥ 10
- **PostgreSQL** ≥ 14

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/LloydMatei254/FreshMercy.git
cd FreshMercy
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:
- `DATABASE_URL` — your PostgreSQL connection string
- `JWT_SECRET` — generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- `EMAIL_PROVIDER` — set to `console` for development

### 3. Database setup

```bash
# Create and run all migrations
npm run db:migrate

# Seed with sample data + admin user
npm run db:seed
```

> The seed creates an admin user using `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` from your `.env`.
> **Change the password after first login.**

### 4. Start development servers

```bash
# Start both API and web in parallel
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Admin: http://localhost:5173/admin

---

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | 64+ char random string for JWT signing |
| `EMAIL_PROVIDER` | `console` / `resend` / `sendgrid` / `smtp` |
| `RESEND_API_KEY` | Resend API key (if using Resend) |
| `ADMIN_EMAIL` | Receives admin notifications |
| `FRONTEND_URL` | Frontend URL (used in CORS + emails) |
| `VITE_API_URL` | API URL visible to the browser |
| `VITE_APP_URL` | Public app URL (for OG tags, sitemap) |
| `COMMUNITY_WHATSAPP_URL` | WhatsApp community link |
| `INSTAGRAM_URL` | Instagram page URL |

---

## Database Commands

```bash
npm run db:generate          # Re-generate Prisma client after schema changes
npm run db:migrate           # Run pending migrations (dev)
npm run db:migrate:deploy    # Run migrations (production)
npm run db:seed              # Seed development data
npm run db:studio            # Open Prisma Studio (visual DB browser)
npm run db:reset             # Reset database + re-run migrations + seed
```

---

## Testing

```bash
# Unit tests (all)
npm run test

# Frontend unit tests only
npm run test --workspace=apps/web

# Backend unit tests only
npm run test --workspace=apps/api

# E2E tests (requires running dev server)
cd apps/web && npx playwright test

# E2E with UI
cd apps/web && npx playwright test --ui
```

---

## Production Build

```bash
npm run build
```

Outputs:
- Frontend: `apps/web/dist/`
- Backend: `apps/api/dist/`

---

## Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)

1. Connect your GitHub repo
2. Set build command: `npm run build --workspace=apps/web`
3. Set output directory: `apps/web/dist`
4. Add all `VITE_*` environment variables in the dashboard

### Backend (Render / Railway / Fly.io)

1. Set start command: `node dist/index.js`
2. Set all environment variables (see `.env.example`)
3. Set `NODE_ENV=production`
4. Run migrations on deploy: `npm run db:migrate:deploy`

### Database (Supabase / Neon / Railway / RDS)

1. Create a PostgreSQL 14+ database
2. Copy the connection string to `DATABASE_URL`
3. Run: `npm run db:migrate:deploy`
4. Run: `npm run db:seed` (first time only — or manually create admin)

### Domain & HTTPS

- Point your domain DNS to your frontend deployment
- Enable HTTPS (automatic on Vercel/Netlify/Cloudflare)
- Update `VITE_APP_URL`, `FRONTEND_URL`, and CORS origins in production env vars
- Update Open Graph URLs in `apps/web/index.html`

---

## Admin Setup

1. After seeding, visit `/admin/login`
2. Log in with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
3. **Immediately change the password** (Settings page or update in DB)
4. Create devotionals, manage prayer requests, approve stories

### Admin Features

| Section | Features |
|---|---|
| Dashboard | Overview metrics |
| Devotionals | Create, edit, publish, archive, delete |
| Prayer Requests | View, mark prayed, archive |
| Messages | View contact form submissions, mark read |
| Subscribers | View newsletter list, export CSV |
| Stories | Approve / reject community stories |

---

## Security

- Passwords hashed with **Argon2** (industry gold standard)
- JWT tokens with configurable expiry
- Rate limiting on all routes (global + strict for forms)
- Helmet security headers on all API responses
- CORS restricted to `FRONTEND_URL`
- Zod input validation on every endpoint
- SQL injection protection via Prisma parameterised queries
- Prayer requests and subscriber data never exposed publicly
- Error messages in production never expose stack traces
- `.env` is gitignored — never committed

---

## Content Management

Admins can publish devotionals without touching code:

1. Log into `/admin`
2. Go to **Devotionals → New Devotional**
3. Write title, excerpt, full content (HTML supported), scripture, author
4. Set status to **Published**
5. Save — it goes live immediately

---

## Troubleshooting

**Database connection fails:**
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall rules if using remote DB

**JWT errors:**
- Ensure `JWT_SECRET` is at least 32 characters
- Check token has not expired (default 7d)

**Emails not sending:**
- Set `EMAIL_PROVIDER=console` for development — emails log to console
- Verify API keys for production providers

**CORS errors:**
- Ensure `FRONTEND_URL` in API matches the actual frontend URL exactly (no trailing slash)

---

## License

© 2026 Fresh Mercy. All rights reserved.

---

*Built with grace. Powered by the steadfast love of the LORD.*
