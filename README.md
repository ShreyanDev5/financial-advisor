# <img src="public/monotosh_logo_1.1.png" width="28" height="28" style="vertical-align: middle;" /> WealthWise

Financial planning platform built for an independent financial advisor, featuring interactive investment calculators, insurance and mutual fund catalogs, and direct WhatsApp lead capture.

[![Live Demo](https://img.shields.io/badge/Live_Demo-monotosh.vercel.app-blue?style=flat-square&logo=vercel&logoColor=white)](https://monotosh.vercel.app/)
[![Tests](https://img.shields.io/badge/Tests-3%2F3%20Passing-brightgreen?style=flat-square)](#4-running-tests)

---

## Preview

| WealthWise Platform Overview |
| :---: |
| <img src="public/readme_home_page.png" width="100%" alt="WealthWise Platform Preview" /> |

---

## Features

- **Financial Calculators**: Real-time calculation engines for SIP, Lumpsum, SWP, Retirement, Child Education, and Child Marriage goals.
- **Service Catalogs**: Structured advisory guides for mutual funds, life/health insurance, and government document services.
- **WhatsApp Lead Funnel**: Context-aware lead capture generating pre-filled consultation inquiries directly from client calculator inputs.
- **Configurable Advisor Profile**: Zero-code advisor customization for contact details, address, and metadata via environment variables.
- **Mathematical Verification**: Comprehensive automated unit test suite validating compounding interest, inflation adjustments, and annuity formulas.

---

## Tech Stack

- **Backend / Runtime**: Next.js 15 (App Router, Server Components), Node.js
- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI, Lucide Icons
- **Deployment & Infra**: Vercel
- **AI Tooling**: Antigravity, Cursor

---

## Project Structure

```text
financial-advisor/
├── app/                  # Next.js App Router pages, layouts, and routes
├── components/           # UI components and interactive landing sections
├── hooks/                # Custom React hooks for interactive state & UI observers
├── lib/                  # Mathematical calculation engines and number formatters
├── public/               # Static assets, advisor imagery, and partner logos
├── scripts/              # Asset generation and formula verification scripts
└── tests/                # Automated formula verification and math unit tests
```

---

## Getting Started

### Prerequisites

- **Node.js**: Version `18.17.0` or higher (Node 20 recommended)
- **npm**: Version `9.0.0` or higher

### 1. Installation

Clone the repository and install dependencies:

**PowerShell / CMD / Unix / macOS:**
```bash
git clone https://github.com/ShreyanDev5/financial-advisor.git
cd financial-advisor
npm install
```

### 2. Environment Configuration

Copy the sample environment file to create your local `.env`:

- **PowerShell (Windows)**:
  ```powershell
  Copy-Item .env.example .env
  ```
- **CMD (Windows)**:
  ```cmd
  copy .env.example .env
  ```
- **Unix / macOS**:
  ```bash
  cp .env.example .env
  ```

### 3. Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Running Tests

Execute the financial formula test suite:

```bash
npm test
```

---

## Deployment

- **Live Application**: [monotosh.vercel.app](https://monotosh.vercel.app/)
- **Platform**: Hosted and deployed continuously via [Vercel](https://vercel.com)

---

## Author

**Shreyan Sardar**
- **Portfolio**: [shreyandev.vercel.app](https://shreyandev.vercel.app)
- **GitHub**: [@ShreyanDev5](https://github.com/ShreyanDev5)
- **LinkedIn**: [shreyansardar](https://www.linkedin.com/in/shreyansardar/)
