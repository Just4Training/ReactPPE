import './globals.css';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'My App',
  description: 'My Next.js app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
