# Financial Advisor

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://financial-advisor-website.vercel.app/)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8HsnGtGfTd9)

A modern, feature-rich financial advisory web application designed to empower users with powerful financial planning tools and insights. Built with Next.js and shadcn/ui, this platform offers a seamless, responsive, and intuitive user experience.

![Application Screenshot](./public/app-reference.jpg)

## ✨ Features

-   **Financial Calculators**: A suite of powerful calculators to help users plan their financial future.
    -   💰 **SIP Calculator**: Project future returns on Systematic Investment Plans.
    -   🏦 **Lumpsum Calculator**: Estimate the future value of a one-time investment.
    -   💸 **SWP Calculator**: Plan your Systematic Withdrawal Plan for post-retirement income.
-   **Core Services**: Comprehensive information on a range of financial products.
    -   **Investment Advisory**: Detailed insights into various investment opportunities.
    -   **Insurance Planning**: Information on different types of insurance policies.
    -   **Document Management**: Guidance on managing essential financial documents.
-   **Modern UX**:
    -   **Responsive Design**: Fully optimized for a seamless experience on any device, from desktops to smartphones.
    -   **Theme Support**: Includes both Light and Dark modes for user comfort.

## 🚀 Live Demo

The live application is deployed on Vercel.

**[➡️ Visit the Live Site](https://financial-advisor-website.vercel.app/)**

---

## 🛠️ Tech Stack

| Category          | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| **Framework**     | [Next.js](https://nextjs.org/)                                          |
| **UI Library**    | [shadcn/ui](https://ui.shadcn.com/)                                     |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                |
| **Forms**         | [React Hook Form](https://react-hook-form.com/)                         |
| **Validation**    | [Zod](https://zod.dev/)                                                 |
| **Charting**      | [Recharts](https://recharts.org/)                                       |
| **Linting**       | [ESLint](https://eslint.org/)                                           |
| **Package Manager**| [npm](https://www.npmjs.com/)                                           |

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── app/                # Main application, routing, and layouts
│   ├── (landing)/      # Route group for primary pages
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
│   ├── landing/        # Components specific to landing pages
│   └── ui/             # Core UI elements (from shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── public/             # Static assets (images, fonts, etc.)
└── ...
```

---

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v20.x or later)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/financial-advisor.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd financial-advisor
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

## 📜 Available Scripts

-   `npm run dev`: Starts the development server at `http://localhost:3000`.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase using ESLint.

## ✅ Testing

The investment calculators have been rigorously tested to ensure mathematical accuracy and robustness. The test suite includes:

-   **Unit & Integration Tests**: Verifying calculations against various scenarios.
-   **Edge Case Analysis**: Validating behavior with minimum, maximum, and zero values.
-   **Formatting Tests**: Ensuring correct implementation of the Indian numbering system.

For a complete overview, please see the [**TESTING_REPORT.md**](./TESTING_REPORT.md).

## 🚀 Deployment

This project is configured for continuous deployment on [Vercel](https://vercel.com/). Every push to the `main` branch automatically triggers a new build and deployment.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
