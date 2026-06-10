'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavChild {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavChild[];
  matchMode?: 'exact' | 'section';
}

interface SideNavBarProps {
  sidebarOpen: boolean;
  onClose: () => void;
  mode?: 'student' | 'lecturer';
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  sidebarOpen,
  onClose,
  mode = 'student',
}) => {
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);
  const coursesHref = mode === 'lecturer' ? '/dosen/courses' : '/courses';
  const coursesActive = pathname === coursesHref || pathname.startsWith(`${coursesHref}/`);
  const [coursesOpenOverride, setCoursesOpenOverride] = useState<boolean | null>(null);
  const coursesOpen = coursesOpenOverride ?? coursesActive;

  useEffect(() => {
    const updateBottom = () => {
      const footer = document.querySelector('footer');
      const aside = asideRef.current;
      if (!footer || !aside) return;
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      aside.style.bottom = footerTop < windowHeight ? `${windowHeight - footerTop}px` : '0px';
    };
    window.addEventListener('scroll', updateBottom, { passive: true });
    window.addEventListener('resize', updateBottom);
    updateBottom();
    return () => {
      window.removeEventListener('scroll', updateBottom);
      window.removeEventListener('resize', updateBottom);
    };
  }, []);

  

  const navItems = useMemo<NavItem[]>(() => {
    if (mode === 'lecturer') {
      return [
        {
          label: 'Dashboard',
          href: '/dosen',
          icon: <HomeIcon />,
          matchMode: 'exact',
        },
        {
          label: 'Courses',
          href: coursesHref,
          icon: <CoursesIcon />,
          matchMode: 'section',
          children: [
            { label: 'My Courses', href: '/dosen/courses', icon: <DotIcon /> },
            { label: 'Leaderboard', href: '/leaderboard', icon: <LeaderboardIcon /> },
          ],
        },
        {
          label: 'Calendar',
          href: '/dosen/calendar',
          icon: <CalendarIcon />,
          matchMode: 'section',
        },
        {
          label: 'Resources',
          href: '/dosen/resources',
          icon: <ResourcesIcon />,
          matchMode: 'section',
        },
      ];
    }

    // student
    return [
      {
        label: 'Home',
        href: '/',
        icon: <HomeIcon />,
        matchMode: 'exact',
      },
      {
        label: 'Courses',
        href: coursesHref,
        icon: <CoursesIcon />,
        matchMode: 'section',
        children: [
          { label: 'My Courses', href: '/courses/my', icon: <DotIcon /> },
          { label: 'Leaderboard', href: '/leaderboard', icon: <LeaderboardIcon /> },
        ],
      },
      {
        label: 'Calendar',
        href: '/calendar',
        icon: <CalendarIcon />,
        matchMode: 'section',
      },
    ];

    
  }, [coursesHref, mode]);

  return (
    <aside
      ref={asideRef}
      data-sidebar
      className="fixed left-0 z-40 flex flex-col overflow-y-auto transition-all duration-300"
      style={{
        top: '73px',
        bottom: 0,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-256px)',
        width: '256px',
        background: 'var(--color-bg-white)',
        borderRight: '1px solid var(--color-border)',
        padding: '24px 16px',
      }}
    >
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = isNavItemActive(pathname, item);
          const isCoursesItem = item.href === coursesHref;
          const showChildren = Boolean(item.children) && (isCoursesItem ? coursesOpen : isActive);

          return (
            <div key={item.href}>
              <div
                className="flex items-center rounded transition-colors"
                style={{
                  background: isActive ? 'var(--color-brand-bg)' : 'transparent',
                  color: isActive ? 'var(--color-brand-dark)' : 'var(--color-text-secondary)',
                  minHeight: '40px',
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex flex-1 items-center gap-3 px-3 py-2.5 text-sm font-medium no-underline"
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>

                {item.children ? (
                  <button
                    type="button"
                    onClick={() => setCoursesOpenOverride(!showChildren)}
                    className="mr-2 flex h-8 w-8 items-center justify-center rounded hover:bg-black/5"
                  >
                    <ChevronDownIcon expanded={showChildren} />
                  </button>
                ) : null}
              </div>

              {showChildren && item.children ? (
                <div className="mt-1 flex flex-col gap-0.5 pl-9">
                  {item.children.map((child) => {
                    const childActive = pathname === child.href || pathname.startsWith(`${child.href}/`);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium no-underline transition-colors"
                        style={{
                          background: childActive ? '#EEF3FF' : 'transparent',
                          color: childActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {child.icon && <span className="shrink-0">{child.icon}</span>}
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

function isNavItemActive(pathname: string, item: NavItem) {
  if (item.matchMode === 'exact') return pathname === item.href;
  if (item.href === '/') return pathname === '/';
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const HomeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <rect width="7" height="7" rx="1" />
    <rect x="11" width="7" height="7" rx="1" />
    <rect y="11" width="7" height="7" rx="1" />
    <rect x="11" y="11" width="7" height="7" rx="1" />
  </svg>
);

const CoursesIcon: React.FC = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1h5a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H1V1z" />
    <path d="M15 1h-5a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h6V1z" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="16" height="16" rx="2" />
    <path d="M13 1v4M5 1v4M1 7h16" />
  </svg>
);

const ResourcesIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="16" height="16" rx="2" />
    <path d="M5 5h8M5 9h8M5 13h5" />
  </svg>
);

const StatsIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="7" width="3" height="6" rx="0.5" />
    <rect x="5.5" y="4" width="3" height="9" rx="0.5" />
    <rect x="10" y="1" width="3" height="12" rx="0.5" />
  </svg>
);

const LeaderboardIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5l3.5-.5L7 1z" />
  </svg>
);

const DotIcon: React.FC = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
    <circle cx="3" cy="3" r="2.5" />
  </svg>
);

const ChevronDownIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    width="10" height="6" viewBox="0 0 10 6" fill="none"
    style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }}
  >
    <path d="M1 1 5 5 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

