# Financial Advisor Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/shreyansardar427-gmailcoms-projects/v0-financial-advisor-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/8HsnGtGfTd9)

A comprehensive financial advisor website built with Next.js and shadcn/ui. This application provides users with various financial calculators, information about investment opportunities, and other financial services.

## Live Demo

The project is deployed on Vercel and can be accessed at:
**[https://financial-advisor-website.vercel.app/](https://financial-advisor-website.vercel.app/)**

## Features

- **Investment Calculators:**
    - **SIP Calculator:** Calculate the future value of your Systematic Investment Plans.
    - **Lumpsum Calculator:** Calculate the future value of a lumpsum investment.
    - **SWP Calculator:** Calculate the Systematic Withdrawal Plan.
- **Financial Services Information:**
    - Information on various investment options.
    - Details about insurance policies.
    - Document management services.
- **Responsive Design:** The application is fully responsive and works on all devices.
- **Themeable:** Supports light and dark mode.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Charting:** [Recharts](https://recharts.org/)
- **Linting:** [ESLint](https://eslint.org/)
- **Package Manager:** [npm](https://www.npmjs.com/)

## Project Structure

```
.
├── app
│   ├── (landing)
│   │   ├── documents
│   │   ├── insurance
│   │   └── invest
│   ├── globals.css
│   └── layout.tsx
├── components
│   ├── landing
│   └── ui
├── hooks
├── lib
├── public
└── styles
```

- **`app`**: Contains the main application logic and routing.
    - **`(landing)`**: A route group for the landing page sections.
- **`components`**: Contains all the React components used in the application.
    - **`landing`**: Components specific to the landing page.
    - **`ui`**: Reusable UI components from shadcn/ui.
- **`hooks`**: Custom React hooks.
- **`lib`**: Utility functions.
- **`public`**: Static assets like images and fonts.
- **`styles`**: Global styles.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/financial-advisor.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd financial-advisor
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run the following commands:

-   **`npm run dev`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
-   **`npm run build`**: Builds the app for production to the `.next` folder.
-   **`npm run start`**: Starts a Next.js production server.
-   **`npm run lint`**: Runs ESLint to find and fix problems in your code.

## Testing

Comprehensive testing has been performed on all investment calculators. The tests cover:

-   **Unit Tests**: Mathematical accuracy verified with various scenarios.
-   **Edge Case Tests**: Validated with minimum and maximum values.
-   **Format Tests**: Verified Indian numbering system formatting.
-   **Special Cases**: Fixed zero interest rate edge case in SIP calculator.

For more details, see the [TESTING_REPORT.md](TESTING_REPORT.md).

## Deployment

This project is automatically deployed to Vercel. Any changes pushed to the `main` branch will trigger a new deployment.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.