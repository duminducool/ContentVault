import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContentVault - Your Content Library',
  description: 'Organize, search, and extract value from all your content in one place',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
