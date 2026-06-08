# Nova Finance

A portfolio project demonstrating a full-stack fintech dashboard: multi-bank linking via Plaid, simulated ACH transfers via Dwolla, a Stripe subscription paywall in front of the experience, and a custom design system rendered with Geist and Tailwind.

Built on top of a tutorial starter, then redesigned, refactored, and extended end-to-end. Deployed to Vercel at https://banking-umber-one.vercel.app.

> **This is not a real banking product.** Plaid and Dwolla run in sandbox mode, Stripe runs in test mode, and there is no money transmitter license behind any of it. The point of this repo is to show that I can ship a feature like this — see the [Production gap](#production-gap-what-would-be-required-to-actually-launch) section for what would be required to actually take real money.

![Tech Stack](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4)
![Stripe](https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logoColor=white&logo=stripe&color=635BFF)
![Appwrite](https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E)

---

## What's actually built

| | |
|---|---|
| **Auth** | Server-side Appwrite session, redirect guards on every protected route |
| **Bank linking** | Plaid Link OAuth flow, account + transaction sync, per-account category aggregation |
| **Dashboard** | Animated total-balance counter, doughnut breakdown, 6-month income vs. expenses chart, recent-transactions table |
| **Transaction history** | Per-account view, live search by merchant/category, server-paged history, CSV export |
| **Transfers** | Dwolla customer + funding-source creation, recipient lookup, transfer execution (sandbox) |
| **Paywall** | Stripe Checkout Session, 14-day free trial with card up front, billing portal access, signed webhook verification |
| **Subscription state** | Stripe is source of truth; customer lookup by email avoids any Appwrite schema migration |
| **Design system** | Geist + Geist Mono, custom Tailwind tokens, badge palette, gradient brand mark, mobile + desktop nav |
| **Verification** | Playwright E2E test drives signup → paywall → Stripe Checkout load → subscription create → dashboard access, with screenshots at every step |

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                 Browser (Next.js)                │
└──────────────┬───────────────────────────────────┘
               │ HttpOnly session cookie
┌──────────────▼───────────────────────────────────┐
│  (auth)/                Public routes            │
│  (root)/                Auth-gated + paywall     │
│  pricing/               Public marketing page    │
│  api/stripe/{checkout,portal,webhook}            │
└──┬──────┬──────┬──────┬──────────────────────────┘
   │      │      │      │
   ▼      ▼      ▼      ▼
Appwrite Plaid Dwolla Stripe
(auth +  (bank  (ACH)  (subscriptions
 DB)     data)         + webhook)
```

Every protected route runs:

```ts
const user = await getLoggedInUser();
if (!user) redirect('/sign-in');
const sub = await getSubscriptionStateByEmail(user.email);
if (!hasAccess(sub)) redirect('/pricing');
```

`getSubscriptionStateByEmail` is wrapped with React's `cache()` so the Stripe lookup happens once per request, not per component.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server Components let us co-locate Appwrite/Stripe calls with the page that needs them |
| Language | TypeScript (strict) | Caught a real bug during testing — `accounts.id` used as a React key on every card |
| Styling | Tailwind + a small CSS layer for design tokens | Tokens like `novaBg`, `novaInk`, `nova-badge` go in `tailwind.config.ts` + `globals.css` so design changes don't require touching every component |
| Auth + DB | Appwrite Cloud | Cheaper than rolling auth, fast enough for a portfolio |
| Bank data | Plaid (sandbox) | Industry standard; would gate behind production approval in a real app |
| Transfers | Dwolla (sandbox) | Cheapest way to demonstrate the ACH flow without becoming a money services business |
| Payments | Stripe (test mode) | Checkout Session for trial-with-card-up-front, signed webhooks, billing portal |
| Charts | Chart.js + react-chartjs-2 | Theme-able enough to match the violet palette |
| Forms | React Hook Form + Zod | Validation lives next to the schema, not the component |
| Toasts | Sonner | Better UX than the shadcn default |
| Testing | Playwright | Drives the real production-style flow end-to-end |

---

## What I learned / what got fixed

A few things worth calling out — the kind of details that don't show up in a tutorial but matter once you start touching real code:

- **shadcn's `<FormItem>` is non-optional for accessibility.** The starter used a plain `<div>` instead, which meant every input rendered with `id="undefined-form-item"`. Labels didn't actually link to inputs. Caught while writing a Playwright test — `getByLabel('First Name')` matched the wrong field every time.
- **Layout `redirect()` and page rendering run in parallel.** Next.js App Router renders layouts and pages concurrently. The starter relied on the layout's `redirect('/sign-in')` to protect pages, but the page body still tried to deref `loggedIn.$id` and crashed on every unauthenticated request — silent in prod, loud in dev. Fix: explicit `if (!user) redirect()` at the top of every protected page.
- **Stripe SDK v22 moved `current_period_end` off the Subscription.** It now lives on each subscription item (`sub.items.data[0].current_period_end`). Migration footnote in the SDK changelog, easy to miss.
- **Stripe Checkout's iframes are hostile to headless tests.** Driving the real card form in Playwright is flaky. The E2E test instead loads Checkout to verify it renders correctly (right customer, right product, right trial), then uses the Stripe API directly to attach a test payment method and create the subscription. Proves the integration without fighting the UI.
- **Stripe webhooks** need a signing secret per environment. Local dev gets one from `stripe listen`; production gets a different one when you create the production endpoint. Two env vars, easy to confuse.

---

## Production gap: what would be required to actually launch

Building this far is easy. Taking real money is not. If this were a real product, here's what's missing:

### Compliance and licensing
- **Plaid production access** — 1–4 week approval, ongoing per-account cost (~$0.30–$1.20/account/mo depending on products)
- **Dwolla production** OR dropping the transfer feature entirely. ACH-as-a-platform requires money transmitter licenses in most US states unless you partner with a regulated sponsor bank.
- **GLBA disclosures** specific to financial data
- **Terms of Service + Privacy Policy** drafted by an actual lawyer, not Termly
- **State privacy laws** — CCPA, etc.

### Product
- **The value prop is undifferentiated.** This is competing against Monarch ($15/mo), Copilot ($13/mo), and YNAB ($15/mo) — all of which are mature, well-loved, and venture-funded. To win you need a wedge: a specific user (freelancers, couples, EU expats with US Stripe accounts) and a specific problem they're underserved on. "Clean banking dashboard" is table stakes.
- **Onboarding flow** — right now a new user lands on an empty dashboard after paying. Real products walk you through linking your first bank, setting categories, etc.
- **Notifications** — email receipts, trial-ending reminders, transaction alerts

### Operations
- **Error monitoring** — Sentry got removed earlier in the project's life; production needs it back
- **Analytics** — PostHog or similar to see where users churn
- **Tests** — there's a single Playwright happy-path test. Unit + integration coverage would be needed for confidence in shipping changes
- **CI gates** — Vercel auto-deploys main; production should require passing tests
- **Customer support** — when someone's locked out of their banking app, "open a GitHub issue" doesn't cut it
- **Backups + DR** — Appwrite Cloud handles most of this for you, but worth a real plan

Honest take: shipping this *exact* product to real users would be a mistake. Shipping it as one wedge of a narrower product (freelancer cash flow, couples' shared budgeting, white-label for a credit union) could work — but that's a different repo.

---

## Getting started locally

### Prerequisites
- Node 18+
- npm
- Sandbox accounts at [Appwrite](https://cloud.appwrite.io), [Plaid](https://dashboard.plaid.com), [Dwolla](https://accounts.dwolla.com)
- A test-mode [Stripe](https://dashboard.stripe.com) account with a recurring Price created

### Setup
```bash
git clone https://github.com/nathanaelhub/banking.git
cd banking
npm install
cp .env.example .env
# Fill in the .env values from the relevant dashboards
npm run dev
```

For the Stripe webhook to work locally, run the Stripe CLI in a second terminal:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the printed whsec_... into .env as STRIPE_WEBHOOK_SECRET
```

### Environment variables
See `.env.example` for the full list. Five Stripe vars matter:
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — keys from the Stripe dashboard
- `STRIPE_PRICE_ID` — `price_...` ID for your subscription Price
- `STRIPE_TRIAL_DAYS` — defaults to 14
- `STRIPE_WEBHOOK_SECRET` — from `stripe listen` locally, or from the production endpoint in dashboard

---

## Project structure

```
app/
  (auth)/                  Public: sign-in, sign-up
  (root)/                  Auth + paywall gated
    page.tsx                 Home dashboard
    my-banks/                Connected accounts
    transaction-history/     Filtered, paged history + CSV
    payment-transfer/        Dwolla transfer form
  pricing/                 Public marketing + Checkout entry
  api/stripe/              Checkout Session, billing portal, webhook
components/
  ui/                      shadcn primitives
  *.tsx                    Feature components (Sidebar, BankCard, …)
lib/
  actions/                 Server actions: Appwrite, Plaid, Dwolla
  stripe.ts                Stripe singleton + cached subscription lookup
  utils.ts                 Formatters, category counting, CSV export
constants/                 Sidebar nav + category styling tables
types/                     Global type declarations
```

---

## License
MIT
