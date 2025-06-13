'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast'

interface User {
    name: string;
    role: string;
    [key: string]: any;
}

interface HeaderClientProps {
    user: User | null;
}

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/auth/user');
            const data = await res.json();
            setUser(data.user);
        };
        fetchUser();
    }, [pathname]);

    const isAuthorized = user;
    const navLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/complaint', label: 'Complaint' },
        { href: '/contact', label: 'Contact' },
        { href: '/about', label: 'About' },
    ];

    const isActive = (href: string) => pathname === href;

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                toast.success('Logged out successfully');
                router.push('/login');
                router.refresh();
            } else {
                toast.error('Logout failed!');
            }
        } catch (error) {
            toast.error('Logout failed!');
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-gray-900 shadow-md border-b border-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-xl font-bold text-orange-500">
                            SCMS
                        </Link>
                        {isAuthorized && (
                            <span className="hidden sm:inline text-gray-300">Hello, {user.name}!</span>
                        )}
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
                        {isAuthorized
                            ? navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`transition-colors ${
                                        isActive(href)
                                            ? 'text-orange-500 font-semibold underline'
                                            : 'text-gray-300 hover:text-orange-400'
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))
                            : (
                                <>
                                    <Link href="/login" className="text-gray-300 hover:text-orange-400">
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                    </nav>

                    {isAuthorized && (
                        <button
                            onClick={handleLogout}
                            className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    )}

                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-md text-gray-300 hover:text-orange-400 hover:bg-gray-800"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800 space-y-2 bg-gray-900 text-white">
                        {isAuthorized && (
                            <div className="px-4 py-2 text-gray-300 border-b border-gray-800">
                                Hello, {user.name}
                            </div>
                        )}
                        <nav className="flex flex-col space-y-2 mt-2">
                            {isAuthorized ? (
                                <>
                                    {navLinks.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`block px-4 py-2 transition-colors ${
                                                isActive(href)
                                                    ? 'text-orange-500 font-semibold underline'
                                                    : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
                                            }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-red-900/20 transition-colors w-full text-left"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-400 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block mx-4 my-2 px-4 py-2 bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
