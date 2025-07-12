'use client';
import { IoHeart } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600 text-lg">☕</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">Yellow Ladder Coffee</span>
                        </div>
                        <p className="text-gray-600 mb-4 max-w-md">
                            Premium coffee management system designed to streamline your coffee shop operations.
                            From order tracking to inventory management, we've got you covered.
                        </p>
                        <div className="flex space-x-4">
                            <a className="text-gray-400 hover:text-orange-600 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a className="text-gray-400 hover:text-orange-600 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a className="text-gray-400 hover:text-orange-600 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a  className="text-gray-400 hover:text-orange-600 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Dashboard
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-orange-600 transition-colors">
                                    System Status
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-6 mb-4 md:mb-0">
                            <p className="text-sm text-gray-500">
                                © {currentYear} Yellow Ladder Coffee. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                                <a className="text-sm text-gray-500 hover:text-orange-600 transition-colors">
                                    Privacy Policy
                                </a>
                                <a className="text-sm text-gray-500 hover:text-orange-600 transition-colors">
                                    Terms of Service
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>Built with</span>
                            <IoHeart className="text-red-500" size={20} />
                            <span>using Next.js & TypeScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
