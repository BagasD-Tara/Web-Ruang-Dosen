import React from 'react';
import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Help Center', href: '#' },
  { label: 'Contact Support', href: '#' },
];

/**
 * Footer — site-wide footer with brand info and navigation links.
 * Positioned at the bottom of the content area (not fixed).
 */
export const Footer: React.FC = () => {
  return (
    <footer
      className="bg-white border-t"
      style={{ borderColor: 'var(--color-border)', position: 'relative', zIndex: 41 }}
    >
      <div
        className="flex items-center justify-between px-6 py-8 max-w-[1280px] mx-auto w-full"
        style={{ minHeight: '109px' }}
      >
        {/* Brand info */}
        <div className="flex flex-col gap-2">
          <span
            className="font-bold text-sm"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            Ruang Dosen
          </span>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            © 2024 Ruang Dosen Academic Platform. All rights reserved.
          </p>
        </div>

        {/* Footer links */}
        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-semibold no-underline transition-colors hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
