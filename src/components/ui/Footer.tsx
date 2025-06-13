'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const socialLinks = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/prana-w',
            color: 'hover:text-gray-900'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/pranaw-kumar-710331215',
            color: 'hover:text-blue-700'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: 'https://twitter.com/prana_W_',
            color: 'hover:text-blue-400'
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'pramadhu.kumar@gmail.com',
            color: 'hover:text-green-600'
        }
    ];

    const importantLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Support', href: '/support' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact Us', href: '/contact' }
    ];

    return (
        <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Current Time Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Current Time</h3>
                        <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                            <p className="text-sm text-slate-200 font-mono">
                                {formatTime(currentTime)}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Important Links</h3>
                        <ul className="space-y-3">
                            {importantLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-300 hover:text-blue-400 hover:bg-slate-700/30 px-2 py-1 rounded transition-all duration-200 text-sm inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Follow Us</h3>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-600/50 transition-all duration-200 transform hover:scale-105"
                                        aria-label={social.name}
                                    >
                                        <IconComponent size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-slate-400">
                            © {new Date().getFullYear()} SCMS. All rights reserved.
                        </div>
                        <div className="text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                            Made with ❤️ by W.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;