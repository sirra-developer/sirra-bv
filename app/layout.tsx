import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIRRA | Van strategie naar resultaat",
  description:
    "Adviesbureau voor organisaties die warmteprojecten niet alleen willen bedenken, maar ook ontwikkelen en realiseren.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
