"use client";

import React from "react";
import Link from "next/link";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Documentation", href: "/docs" },
        { label: "Community", href: "/community" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700">
      {/* Main Footer Content */}
      <div className="w-11/12 2xl:w-5/6 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-3xl font-black text-primary mb-2">
                Skill
                <span className="text-text1 dark:text-text1-dark">Stack</span>
              </h3>
              <p className="text-text2 dark:text-text2-dark text-base leading-relaxed">
                Empowering learners worldwide with cutting-edge skills and
                knowledge. Join our community and unlock your potential.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-base text-text2 dark:text-text2-dark">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@skillstack.com</span>
              </div>
              <div className="flex items-center gap-3 text-base text-text2 dark:text-text2-dark">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-base text-text2 dark:text-text2-dark">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-background dark:bg-background-dark text-text2 dark:text-text2-dark hover:text-primary dark:hover:text-primary hover:bg-primary/10   transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-xl font-semibold text-text1 dark:text-text1-dark ml-3.5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-base text-text2 dark:text-text2-dark hover:text-primary transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold text-text1 dark:text-text1-dark mb-2">
              Stay Updated
            </h4>
            <p className="text-text2 dark:text-text2-dark text-sm mb-6">
              Get the latest courses and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-background dark:bg-background-dark text-text1 dark:text-text1-dark placeholder:text-text2 dark:placeholder:text-text2-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="bg-background dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
        <div className="w-11/12 2xl:w-5/6 mx-auto py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-base text-text2 dark:text-text2-dark">
              <span>© {currentYear} SkillStack. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6 text-base">
              <Link
                href="/privacy"
                className="text-text2 dark:text-text2-dark hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-text2 dark:text-text2-dark hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-text2 dark:text-text2-dark hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>

            <div className="flex items-center gap-2 text-base text-text2 dark:text-text2-dark">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
