"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const Navbar2 = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStore = useAuthStore();
    const handleLogout = () => {
        authStore.logout();
        toast.success("Logged out successfully");
        router.push("/login");
    };
    const navItems = [
        { href: "/reports", label: "Reports" },
        { href: "/reports/submit", label: "Submit Report" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <header className="w-full border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo with Icon */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                SochNepal
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-medium text-gray-70 hover:font-bold transition-colors duration-200 ${
                                    pathname === item.href && "text-primary"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {!authStore.isAuthenticated ? (
                            <>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <Button onClick={handleLogout}>Logout</Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 border-t">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-700  hover:bg-gray-50 rounded-md transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="px-3 py-2 space-y-2">
                                {!authStore.isAuthenticated ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link
                                                href="/login"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Login
                                            </Link>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link
                                                href="/signup"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Sign Up
                                            </Link>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button>Dashboard</Button>
                                        <Button onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar2;
