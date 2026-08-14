# WealthWise

Financial planning platform built for an independent financial advisor, featuring interactive investment calculators, insurance and mutual fund catalogs, and direct WhatsApp lead capture.

[**Live Demo**](https://monotosh.vercel.app/) · [**GitHub Repository**](https://github.com/ShreyanDev5/financial-advisor)

![WealthWise Home Page](public/readme_home_page.png)

---

## Features

- **Financial Calculators**: Real-time calculations for SIP, Lumpsum, SWP, Retirement, Child Education, and Child Marriage.
- **Service Catalogs**: Structured guides for mutual funds, health/life insurance, and document services (PAN, Aadhaar, ITR).
- **WhatsApp Lead Funnel**: Pre-filled WhatsApp inquiry buttons based on client calculator inputs or selected services.
- **Configurable Advisor Details**: Change advisor name, phone, email, and address via `.env` without modifying code.
- **Formula Unit Tests**: Automated unit tests validating compounding interest, inflation, and annuity formulas.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 18 |
| **Language** | TypeScript |
| **Styling & UI** | Tailwind CSS, Radix UI, Lucide Icons |
| **Testing** | tsx |
| **AI Tooling** | Antigravity, GitHub Copilot |
| **Deployment** | Vercel |

---

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/ShreyanDev5/financial-advisor.git
cd financial-advisor
npm install

# 2. Configure environment (PowerShell/Bash: cp, Command Prompt: copy)
cp .env.example .env

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Build production bundle |
| `npm test` | Run all financial formula math tests |
| `npm run lint` | Run ESLint checks |

---

## Project Structure

```text
financial-advisor/
├── app/                  # Next.js App Router pages and routes
├── components/           # Landing sections and Radix UI components
├── lib/                  # Compounding math, calculators, and currency formatters
├── public/               # Static assets and partner logos
└── tests/                # Mathematical unit tests
```

---

## Author

**Shreyan Sardar**
- Portfolio: [shreyandev.vercel.app](https://shreyandev.vercel.app)
- GitHub: [@ShreyanDev5](https://github.com/ShreyanDev5)
- LinkedIn: [linkedin.com/in/shreyansardar](https://www.linkedin.com/in/shreyansardar/)
