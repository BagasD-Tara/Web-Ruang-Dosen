'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TopNavBarProps {
  onToggleSidebar: () => void;
  brandHref?: string;
  searchBasePath?: string;
}

// Komponen dalam yang pakai useSearchParams
function TopNavBarInner({
  onToggleSidebar,
  brandHref = '/courses',
  searchBasePath,
}: TopNavBarProps) {
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
      <div
        className="flex items-center justify-between h-full w-full"
        style={{ paddingLeft: '16px', paddingRight: '24px' }}
      >
        {/* Kiri: Hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
          >
            <HamburgerIcon />
          </button>
          <Link href={brandHref} className="flex items-center gap-2 no-underline">
            <BookIcon />
            <span
              className="text-xl font-bold hidden sm:inline"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Ruang Dosen
            </span>
          </Link>
        </div>

        {/* Tengah: Search */}
        <div className="hidden sm:block flex-1 max-w-[450px] mx-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources, courses..."
              value={currentQuery}
              onChange={(e) => applySearch(e.target.value)}
              className="w-full h-9 pl-10 pr-4 rounded-full text-sm outline-none"
              style={{ background: '#F3F4F5', color: 'var(--color-text-secondary)' }}
            />
          </div>
        </div>

        {/* Kanan: Search mobile + Notif + Avatar */}
        <div className="flex items-center gap-2">
          <button
            className="flex sm:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon />
            <span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: 'var(--color-danger)' }}
            />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border overflow-hidden"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-brand-subtle)',
            }}
            aria-label="User profile"
          >
            <UserAvatarIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

// Export utama — bungkus dengan Suspense agar tidak crash
export const TopNavBar: React.FC<TopNavBarProps> = (props) => {
  return (
    <Suspense
      fallback={
        <header
          className="fixed top-0 left-0 right-0 z-50 bg-white border-b"
          style={{ borderColor: 'var(--color-border)', height: '73px' }}
        />
      }
    >
      <TopNavBarInner {...props} />
    </Suspense>
  );
};

/* ── Icons ── */

const HamburgerIcon: React.FC = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <rect width="18" height="2" rx="1" fill="#434654" />
    <rect y="5" width="18" height="2" rx="1" fill="#434654" />
    <rect y="10" width="18" height="2" rx="1" fill="#434654" />
  </svg>
);

const BookIcon: React.FC = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 1h7a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H1V1z" stroke="#003594" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 1h-7a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h8V1z" stroke="#003594" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#737685" strokeWidth="1.8" />
    <path d="m13 13 3 3" stroke="#737685" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
    <path d="M8 0a1 1 0 0 1 1 1v.57A7 7 0 0 1 15 8c0 4.12-1.34 6-3 7H4c-1.66-1-3-2.88-3-7a7 7 0 0 1 6-6.43V1a1 1 0 0 1 1-1z" fill="#434654" />
    <path d="M6 17a2 2 0 0 0 4 0" fill="#434654" />
  </svg>
);

const UserAvatarIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3" fill="#003594" />
    <path d="M3 17c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);