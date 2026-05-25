# 💼 WealthWise — Financial Advisor

A premium, high-performance web application tailored for personal financial planning and professional advisory workflows. Designed with a clean aesthetic and responsive user interface, it empowers users with state-of-the-art tools to visualize and plan their financial future.

---

## ✨ Key Features

*   📊 **Comprehensive Calculators**: SIP, Lumpsum, SWP, Retirement, Child Education, and Marriage planning.
*   📑 **Essential Services**: Curated resources and info pages detailing Investments, Insurance policies, and critical Documents.
*   ⚡ **Premium UI Components**: Fully responsive landing pages designed with subtle micro-animations and clean modern patterns.
*   🧪 **Robust Verification**: High-integrity unit tests validating all financial mathematics across multiple edge cases.

---

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (App Router) + React 18
*   **Styling**: Tailwind CSS + CSS Variables (harmonious light/dark themed variables)
*   **Component Base**: Radix UI + Lucide Icons
*   **Type Safety**: TypeScript 5 + ESLint (strict quality controls)

---

## 🚀 Quick Start

### 📋 Prerequisites
*   **Node.js**: `20.x` or higher
*   **npm**: `10.x` or higher

### ⚙️ Installation
```bash
# Clone the repository
git clone <repository-url>
cd financial-advisor

# Install dependencies (highly optimized pruned list)
npm install
```

### 💻 Running Locally
```bash
# Start the local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

---

## 📂 Project Structure

```text
app/          # Next.js 15 pages, layout wrappers, and global styles
components/   # Modular UI elements and layout sections (Landing, Header, Footer)
hooks/        # Custom React hooks (Intersection Observer, theme detection)
lib/          # Pure utility functions and mathematical calculator logic
public/       # Optimized static assets, logos, and web manifests
scripts/      # Developer helper scripts
tests/        # TypeScript test suites (comprehensive mathematical coverage)
```

---

## 🧪 Testing and Quality Control

We prioritize correctness. The mathematical engine is covered by multi-dimensional test suites.

```bash
# Run all automated test suites
npm test

# Run individual test suites directly
npm run test:basic         # Core calculations (SIP, Lumpsum, SWP)
npm run test:comprehensive # Stress testing with extreme financial scales
npm run test:formatting    # Currency locale representation checks
```

---

## 📈 Development Commands

*   `npm run dev` — Launch standard dev environment on port `3000`
*   `npm run build` — Generate an optimized production build of the Next.js application
*   `npm run start` — Serve the compiled build locally
*   `npm run lint` — Analyze and check codebase for TypeScript & code style linting issues

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
