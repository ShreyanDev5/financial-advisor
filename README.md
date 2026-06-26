# WealthWise

A portfolio landing page and financial planning application for a Certified Financial Planner (CFP). It includes interactive financial calculators, service details, and contact funnels.

## Key Features

*   **Financial Calculators**: Custom modules for SIP, Lumpsum, SWP, Retirement, Child Education, and Marriage planning.
*   **Service Pages**: Informative breakdowns of mutual funds, insurance policies, and essential registry documents.
*   **Dynamic Configurations**: All contact details, WhatsApp message templates, and logos are configurable via environment variables.
*   **Mathematical Testing**: Unit tests verifying the accuracy of the financial math engine.

## Tech Stack

*   **Framework**: Next.js 15 (App Router) & React 18
*   **Styling**: Tailwind CSS & CSS Variables
*   **Components & Icons**: Radix UI & Lucide Icons
*   **Language & Tooling**: TypeScript & ESLint
*   **AI Tooling**: GitHub Copilot & Antigravity

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in the advisor's details:
```bash
cp .env.example .env
```
*Note: If no variables are set, the app defaults to the original client's contact information.*

### 3. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it.

## Key Commands

*   `npm run dev` — Starts the local development server.
*   `npm run build` — Compiles the optimized production build.
*   `npm test` — Runs all mathematical unit tests.
*   `npm run lint` — Performs static analysis checks.

## Project Structure

*   `app/` — Next.js layout wrappers and page routes.
*   `components/` — UI components and section layouts.
*   `lib/` — Core mathematical logic and utility functions.
*   `tests/` — Mathematical validations and edge case test suites.

## License

MIT
