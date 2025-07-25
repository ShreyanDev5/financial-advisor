import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinanceFlow - Your Financial Partner | Monotosh Sardar",
  description:
    "Professional financial planning and advisory services in Mumbai. Expert guidance for insurance, investments, mutual funds, and government documentation services.",
  keywords:
    "financial advisor, insurance, mutual funds, investment planning, PAN card, tax filing, Mumbai financial services",
  authors: [{ name: "Monotosh Sardar" }],
  creator: "Monotosh Sardar",
  publisher: "FinanceFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://financeflow.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FinanceFlow - Your Financial Partner",
    description: "Professional financial planning and advisory services in Mumbai",
    url: "https://financeflow.example.com",
    siteName: "FinanceFlow",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceFlow - Your Financial Partner",
    description: "Professional financial planning and advisory services in Mumbai",
    creator: "@financeflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
