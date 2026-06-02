'use client';

import React, { createContext, useContext, useMemo, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';
import { Footer } from './Footer';

const TOP_NAV_HEIGHT_PX = 73;
const DESKTOP_SIDEBAR_WIDTH_PX = 256;
const TABLET_SIDEBAR_WIDTH_PX = 64;

interface AppShellProps {
  children: React.ReactNode;
}

interface AppShellContextValue {
  isMobile: boolean;
  isTablet: boolean;
  sidebarOpen: boolean;
  rightSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openRightSidebar: () => void;
  closeRightSidebar: () => void;
  toggleRightSidebar: () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const sidebarOpen = isMobile ? mobileSidebarOpen : !desktopSidebarCollapsed;

  const contextValue = useMemo<AppShellContextValue>(
    () => ({
      isMobile,
      isTablet,
      sidebarOpen,
      rightSidebarOpen,
      openSidebar: () => {
        setRightSidebarOpen(false);

        if (isMobile) {
          setMobileSidebarOpen(true);
          return;
        }

        setDesktopSidebarCollapsed(false);
      },
      closeSidebar: () => {
        if (isMobile) {
          setMobileSidebarOpen(false);
          return;
        }

        setDesktopSidebarCollapsed(true);
      },
      toggleSidebar: () => {
        setRightSidebarOpen(false);

        if (isMobile) {
          setMobileSidebarOpen((prev) => !prev);
          return;
        }

        setDesktopSidebarCollapsed((prev) => !prev);
      },
      openRightSidebar: () => {
        if (isMobile) {
          setMobileSidebarOpen(false);
        } else {
          setDesktopSidebarCollapsed(true);
        }

        setRightSidebarOpen(true);
      },
      closeRightSidebar: () => setRightSidebarOpen(false),
      toggleRightSidebar: () => {
        setRightSidebarOpen((prev) => {
          const next = !prev;

          if (next) {
            if (isMobile) {
              setMobileSidebarOpen(false);
            } else {
              setDesktopSidebarCollapsed(true);
            }
          }

          return next;
        });
      },
    }),
    [isMobile, isTablet, rightSidebarOpen, sidebarOpen]
  );

  const gutterWidth = getSidebarGutterWidth({
    isMobile,
    isTablet,
    sidebarOpen,
  });

  return (
    <AppShellContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-backdrop)' }}>
        <TopNavBar onToggleSidebar={contextValue.toggleSidebar} />
        <SideNavBar sidebarOpen={sidebarOpen} onClose={contextValue.closeSidebar} />

        {isMobile && sidebarOpen ? (
          <div
            className="fixed inset-0 z-30 bg-black/30"
            onClick={contextValue.closeSidebar}
          />
        ) : null}

        <div style={{ paddingTop: `${TOP_NAV_HEIGHT_PX}px`, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex' }}>
            <div
              style={{
                width: `${gutterWidth}px`,
                flexShrink: 0,
                borderRight: gutterWidth > 0 ? '1px solid var(--color-border)' : 'none',
                transition: 'width 0.3s ease',
              }}
            />

            <main
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                padding: 'var(--page-surface-gap)',
                background: 'var(--color-bg-backdrop)',
              }}
            >
              <div
                key={pathname}
                className="h-full page-transition"
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  border: '1px solid rgba(195,198,214,0.72)',
                  borderRadius: 'var(--page-surface-radius)',
                  background: 'var(--color-bg-page)',
                  boxShadow: '0 18px 40px rgba(15, 33, 74, 0.04)',
                }}
              >
                {children}
              </div>
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </AppShellContext.Provider>
  );
};

export function useAppShell() {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error('useAppShell must be used within AppShell');
  }

  return context;
}

function getSidebarGutterWidth({
  isMobile,
  isTablet,
  sidebarOpen,
}: {
  isMobile: boolean;
  isTablet: boolean;
  sidebarOpen: boolean;
}) {
  if (isMobile || !sidebarOpen) {
    return 0;
  }

  return isTablet ? TABLET_SIDEBAR_WIDTH_PX : DESKTOP_SIDEBAR_WIDTH_PX;
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') {
        return () => undefined;
      }

      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onStoreChange);
      return () => mediaQuery.removeEventListener('change', onStoreChange);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    () => false
  );
}
