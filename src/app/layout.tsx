import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Toaster} from 'react-hot-toast'
import "./globals.css";
import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SCMS",
    description: "Society Complaint Management System. Crafted by W."
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
         {/*@ts-ignore*/}
        <Header />
        <main className="flex-grow">{children}</main>
        <Toaster position="bottom-right" reverseOrder={false}/>
        <Footer/>
        </body>
        </html>
    );
}
