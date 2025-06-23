'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
            MyApp
            </Link>
            <div className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            {user?.isAdmin && <Link href="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>}
            {user ? (
                <button onClick={logout} className="text-gray-700 hover:text-blue-600 hover:underline">Logout</button>
            ) : (
                <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            )}
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            </div>
        </div>
        </nav>
    );
}