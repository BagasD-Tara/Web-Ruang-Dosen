export default function CalendarPage() {
  return (
    <main className="dashboard-content">
      <section
        className="rounded-[28px] border bg-white p-8 text-center shadow-[0_18px_40px_rgba(15,33,74,0.04)]"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--color-brand-primary)" }}>
          Calendar
        </p>
        <h1 className="mt-3 text-3xl font-bold" style={{ color: "var(--color-text-primary)" }}>
          Fitur belum tersedia
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "var(--color-text-secondary)" }}>
          Halaman kalender akan tersedia setelah endpoint jadwal akademik siap diintegrasikan.
        </p>
      </section>
    </main>
  );
}
