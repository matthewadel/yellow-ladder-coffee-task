'use client';
import { IoHeart } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ReactNode } from "react";

// Types
interface SocialLink {
    name: string;
    icon: ReactNode;
    href?: string;
}

interface NavigationSection {
    title: string;
    links: string[];
}

interface FooterLink {
    label: string;
    href?: string;
}

// Reusable Components
const SocialIcon = ({ name, icon }: SocialLink) => (
    <a 
        className="text-gray-400 hover:text-orange-600 transition-colors"
        aria-label={name}
    >
        <span className="sr-only">{name}</span>
        {icon}
    </a>
);

const NavigationLinks = ({ title, links }: NavigationSection) => (
    <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            {title}
        </h3>
        <ul className="space-y-3">
            {links.map((link) => (
                <li key={link}>
                    <a className="text-gray-600 hover:text-orange-600 transition-colors">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const FooterLink = ({ label }: FooterLink) => (
    <a 
        className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
    >
        {label}
    </a>
);

const CompanyLogo = () => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-600 text-lg">☕</span>
        </div>
        <span className="text-xl font-semibold text-gray-900">Yellow Ladder Coffee</span>
    </div>
);

// Constants
const SOCIAL_LINKS: SocialLink[] = [
    { name: "Facebook", icon: <FaFacebookF className="w-5 h-5" /> },
    { name: "Twitter", icon: <FaTwitter className="w-5 h-5" /> },
    { name: "Instagram", icon: <FaInstagram className="w-5 h-5" /> },
    { name: "LinkedIn", icon: <FaLinkedinIn className="w-5 h-5" /> },
];

const NAVIGATION_SECTIONS: NavigationSection[] = [
    {
        title: "Dashboard",
        links: ["Overview", "Orders", "Analytics", "Settings"]
    },
    {
        title: "Support",
        links: ["Help Center", "Documentation", "Contact Us", "System Status"]
    }
];

const FOOTER_LINKS: FooterLink[] = [
    { label: "Privacy Policy" },
    { label: "Terms of Service" }
];

const COMPANY_DESCRIPTION = "Premium coffee management system designed to streamline your coffee shop operations. From order tracking to inventory management, we've got you covered.";

export function Footer() {

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <CompanyLogo />
                        <p className="text-gray-600 mb-4 max-w-md">
                            {COMPANY_DESCRIPTION}
                        </p>
                        <div className="flex space-x-4">
                            {SOCIAL_LINKS.map((social) => (
                                <SocialIcon key={social.name} {...social} />
                            ))}
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    {NAVIGATION_SECTIONS.map((section) => (
                        <NavigationLinks key={section.title} {...section} />
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-6 mb-4 md:mb-0">
                            <p className="text-sm text-gray-500">
                                © 2025 Yellow Ladder Coffee. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                                {FOOTER_LINKS.map((link) => (
                                    <FooterLink key={link.label} {...link} />
                                ))}
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
