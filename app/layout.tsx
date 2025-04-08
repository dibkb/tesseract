import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { manrope } from "@/constants/fonts";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ScriptsStoreProvider } from "@/stores/scripts-provider";
import Navbar from "@/components/navbar";
export const metadata: Metadata = {
  title: "Tesseract",
  description: "Tesseract is a ai low code platform for building websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <NuqsAdapter>
          <ScriptsStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              {children}
              <Toaster />
            </ThemeProvider>
          </ScriptsStoreProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
