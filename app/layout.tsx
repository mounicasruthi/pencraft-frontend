import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/navbar';
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pencraft - Modern Blogging Platform',
  description: 'Share your thoughts with the world through elegant prose',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}