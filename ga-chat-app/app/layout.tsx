import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GA4 Analytics Chat',
  description: 'Conversational Google Analytics for Miraclesuit, Venus, Vitamin A & Longitude',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
