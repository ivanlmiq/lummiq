import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource/poppins";
import "./globals.css";
import { ToasterProvider } from "@/provider/toast-provider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "AcademIQ - School Management System",
    description:
        "A school management system, to manage students, classes, and assignments. Powered by Booqself.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ToasterProvider />

                {children}
            </body>
        </html>
    );
}
