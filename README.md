# Financial Advisor

A streamlined application for personal financial planning and professional advisory workflows.

## What It Includes

- Financial calculators: SIP, Lumpsum, SWP, retirement, education, and marriage planning
- Information pages for investments, insurance, and documents
- Responsive landing pages built with reusable UI components

## Tech Stack

- Next.js 15 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui patterns
- ESLint for linting
- Source-based calculator tests (TypeScript)

## Quick Start

### Requirements

- Node.js 20+
- npm

### Setup

```sh
git clone <private-repo-url>
cd financial-advisor
npm install
```

### Run Locally

```sh
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

```sh
npm run dev                # start dev server
npm run lint               # run lint checks
npm test                   # run all test suites
npm run test:basic         # run baseline calculator tests
npm run test:comprehensive # run edge-case calculator tests
npm run test:formatting    # run currency-format tests
npm run build              # production build
npm run start              # run production server
```

## Project Structure

```text
app/         Next.js app routes and layouts
components/  Landing and reusable UI components
hooks/       React hooks
lib/         Core calculator and utility logic
public/      Static assets
scripts/     Utility scripts
tests/       Source-based TypeScript test suites
```

## License

MIT. See `LICENSE`.
