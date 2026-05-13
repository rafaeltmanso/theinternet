import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "The Internet - Testing Playground",
  description: "A comprehensive testing playground with 46 automated testing examples for practice.",
  keywords: ["The Internet", "Testing", "Automation", "Selenium", "Playwright", "Cypress", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "The Internet Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground"
      >
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
