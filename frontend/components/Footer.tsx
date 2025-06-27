import Link from "next/link";
import { MapPin, Mail, Phone, Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">SochNepal</span>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            A social accountability platform to report and track
                            civic issues in Nepal. Together, we can make our
                            communities better.
                        </p>
                        <p className="text-sm text-gray-400">
                            Building civic tech for the people of Nepal 🇳🇵
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/reports"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    View Reports
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/reports/submit"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Submit Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">
                                    hello@sochnepal.org
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">
                                    +977-XXX-XXXX
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">
                                    Kathmandu, Nepal
                                </span>
                            </li>
                        </ul>

                        {/* Social Links */}
                        <div className="mt-4">
                            <div className="flex space-x-3">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} SochNepal. All rights
                            reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/help"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Help
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
