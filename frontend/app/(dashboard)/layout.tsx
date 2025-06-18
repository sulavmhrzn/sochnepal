import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "sonner";
import Provider from "@/components/Provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dashboard | SochNepal - Report Civic Issues in Nepal",
    description:
        "A social accountability platform to report and track civic issues in Nepal. Join thousands of citizens making their communities better.",
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <html>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Provider>
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full px-4">
                            <SidebarTrigger />
                            {children}
                        </main>
                    </SidebarProvider>
                </Provider>
                <Toaster richColors />
            </body>
        </html>
    );
};

export default Layout;
