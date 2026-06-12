'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BrandLogo } from './BrandLogo';

interface TopNavBarProps {
  onToggleSidebar: () => void;
  brandHref?: string;
  searchBasePath?: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  onToggleSidebar,
  brandHref = '/courses',
  searchBasePath,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') ?? '';

  const applySearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedValue = value.trim();

    if (trimmedValue) {
      params.set('q', trimmedValue);
    } else {
      params.delete('q');
    }

    const queryString = params.toString();
    const basePath = searchBasePath ?? (pathname.startsWith('/courses/my') ? '/courses/my' : '/courses');
    const nextPath = queryString ? `${basePath}?${queryString}` : basePath;
    router.replace(nextPath);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b"
      style={{ borderColor: 'var(--color-border)', height: '73px' }}
    >
      <div className="flex items-center justify-between h-full w-full"
        style={{ paddingLeft: '16px', paddingRight: '24px' }}>

        {/* Left: Hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
          >
            <HamburgerIcon />
          </button>
          <BrandLogo href={brandHref} hideTextOnMobile />
        </div>

        {/* Center: Search — sembunyikan di mobile */}
        <div className="hidden flex-1 justify-center px-6 sm:flex">
          <div
            className="flex h-11 w-full max-w-[420px] items-center rounded-2xl border px-5 transition-all focus-within:border-[#2563EB] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
            style={{
              background: '#F1F5F9',
              borderColor: 'var(--color-border)',
            }}
          >
            <input
              type="text"
              placeholder="Cari sesuatu..."
              value={currentQuery}
              onChange={(event) => {
                applySearch(event.target.value);
              }}
              className="h-full min-w-0 flex-1 bg-transparent text-center text-sm outline-none placeholder:text-slate-400"
              style={{
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>

        {/* Right: Search icon mobile + Notif + Avatar */}
        <div className="flex items-center gap-2">

          {/* Search icon hanya di mobile */}
          <button className="flex sm:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
            aria-label="Search">
            <SearchIcon />
          </button>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle dark or light mode"
            title="Dark / Light Mode"
            type="button"
          >
            <ThemeModeIcon />
          </button>

          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: 'var(--color-danger)' }} />
          </button>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border overflow-hidden"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-brand-subtle)' }}
            aria-label="User profile"
          >
            <UserAvatarIcon />
          </button>
        </div>

      </div>
    </header>
  );
};

/* Icon sub-components kept inline because they are only used by this top bar. */

const HamburgerIcon: React.FC = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <rect width="18" height="2" rx="1" fill="#434654" />
    <rect y="5" width="18" height="2" rx="1" fill="#434654" />
    <rect y="10" width="18" height="2" rx="1" fill="#434654" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#737685" strokeWidth="1.8" />
    <path d="m13 13 3 3" stroke="#737685" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ThemeModeIcon: React.FC = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="#434654" strokeWidth="1.8" />
    <path
      d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42"
      stroke="#434654"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18 9.7V12c0 1.9.62 3.18 1.38 4.05A1.18 1.18 0 0 1 18.5 18H5.5a1.18 1.18 0 0 1-.88-1.95C5.38 15.18 6 13.9 6 12V9.7C6 6.6 8.6 4 12 4s6 2.6 6 5.7Z"
      stroke="#334155"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.75 20a2.5 2.5 0 0 0 4.5 0"
      stroke="#334155"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <path
      d="M12 2.75V4"
      stroke="#334155"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

const UserAvatarIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3" fill="#003594" />
    <path d="M3 17c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

