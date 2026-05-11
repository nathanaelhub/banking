# Apex Finance

A full-stack fintech banking application built with Next.js 14, featuring real bank account connections, live transaction data, fund transfers, and spending analytics.

![Tech Stack](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4)
![Appwrite](https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E)

---

## Features

- **Authentication** — Secure server-side auth via Appwrite with protected routes and session management
- **Connect Banks** — Plaid integration to link multiple real bank accounts
- **Dashboard** — Total balance across all accounts, spending overview chart (last 6 months), and recent transactions
- **Transaction Search** — Live search by name, filter by category, local pagination, and one-click CSV export
- **Transaction History** — Full transaction history per account with detailed status and category badges
- **My Banks** — View all connected accounts with card details and account info
- **Fund Transfers** — Send money between Apex users via Dwolla ACH transfers
- **Toast Notifications** — Real-time success and error feedback on all auth actions
- **Responsive** — Fully responsive across desktop, tablet, and mobile with a collapsible mobile nav

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth & Database | Appwrite |
| Bank Linking | Plaid |
| Payments | Dwolla |
| Charts | Chart.js + react-chartjs-2 |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| Error Monitoring | Sentry |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Accounts on [Appwrite](https://cloud.appwrite.io), [Plaid](https://dashboard.plaid.com), and [Dwolla](https://accounts.dwolla.com)

### Installation

```bash
git clone <your-repo-url>
cd banking
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Next
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_ITEM_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
NEXT_APPWRITE_KEY=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions
PLAID_COUNTRY_CODES=US

# Dwolla
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── (auth)/          # Sign in / Sign up pages
│   └── (root)/          # Protected dashboard pages
│       ├── page.tsx               # Home dashboard
│       ├── my-banks/              # Connected accounts
│       ├── transaction-history/   # Full transaction history
│       └── payment-transfer/      # Send funds
├── components/          # Reusable UI components
├── lib/
│   ├── actions/         # Server actions (Appwrite, Plaid, Dwolla)
│   └── utils.ts         # Helpers + CSV export utility
├── constants/           # Category styles and sidebar config
└── types/               # Global TypeScript types
```

---

## License

MIT
