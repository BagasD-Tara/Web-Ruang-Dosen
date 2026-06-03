import Link from 'next/link';

interface LecturerBreadcrumbItem {
  label: string;
  href?: string;
}

interface LecturerBreadcrumbsProps {
  items: LecturerBreadcrumbItem[];
}

export function LecturerBreadcrumbs({ items }: LecturerBreadcrumbsProps) {
  return (
    <nav
      className="mb-6 flex flex-wrap items-center gap-2 text-sm"
      style={{ color: 'var(--color-text-secondary)' }}
    >
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLastItem ? (
              <Link href={item.href} className="no-underline transition-opacity hover:opacity-70">
                {item.label}
              </Link>
            ) : (
              <span style={{ color: isLastItem ? 'var(--color-text-primary)' : undefined }}>
                {item.label}
              </span>
            )}

            {!isLastItem ? <BreadcrumbChevronIcon /> : null}
          </div>
        );
      })}
    </nav>
  );
}

function BreadcrumbChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5 3.5 8.5 7 5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
