import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChurnVision | Customer churn intelligence",
  description: "A clear, fast way to identify customers at risk of churn."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
