import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanmay Moharana",
  description: "Product Leader & Digital Innovator Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">{`
          (function() {
            try {
              var t = localStorage.getItem('portfolio-theme');
              if (t === 'light') {
                document.documentElement.classList.remove('dark');
              }
            } catch(e) {}
          })();
        `}</Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
