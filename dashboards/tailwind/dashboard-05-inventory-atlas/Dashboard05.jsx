import { Suspense, lazy } from "react";

const WarehouseHeatmap = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="grid h-full grid-cols-6 gap-2 rounded-3xl border border-teal-500/40 bg-teal-950/70 p-5">
        <p className="col-span-6 text-sm font-semibold text-teal-100">Warehouse utilization</p>
        {Array.from({ length: 24 }).map((_, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-400/10 transition duration-150 hover:scale-105"
          />
        ))}
      </div>
    ),
  })
);

export default function Dashboard05() {
  const tabs = ["Overview", "Reorder", "Suppliers", "Transfers"];
  const items = [
    { sku: "SKU-1294", qty: 84, threshold: 40 },
    { sku: "SKU-8831", qty: 12, threshold: 50 },
    { sku: "SKU-2278", qty: 190, threshold: 80 },
  ];

  return (
    <div className="min-h-screen bg-teal-950 text-teal-50">
      <header className="sticky top-0 z-30 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
        <div>
          <h1 className="text-lg font-semibold text-white">Inventory atlas</h1>
          <p className="text-sm text-teal-200/80">Live stock signals across distribution hubs.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['All hubs', 'Low stock', 'Surplus'].map((filter) => (
            <button key={filter} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-teal-400/40 hover:text-white">
              {filter}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 py-8 lg:grid-cols-[180px_1fr]">
        <div className="sticky top-24 hidden flex-col gap-2 lg:flex" role="tablist" aria-label="Inventory tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              role="tab"
              aria-selected={index === 0}
              className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-teal-200 ${index === 0 ? 'border-teal-400/40 text-white' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article key={item.sku} className="rounded-3xl border border-white/10 bg-teal-900/60 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{item.sku}</p>
                  <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs text-teal-100">{item.qty} units</span>
                </div>
                <p className="mt-3 text-xs text-teal-200/70">Threshold {item.threshold}</p>
                <div className="mt-4 h-2 rounded-full bg-teal-500/20">
                  <div className="h-full rounded-full bg-teal-400" style={{ width: `${Math.min(100, (item.qty / (item.threshold || 1)) * 50 + 30)}%` }} />
                </div>
              </article>
            ))}
          </div>

          <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl border border-teal-500/20 bg-teal-900/40" />}>
            <WarehouseHeatmap />
          </Suspense>

          <div className="rounded-3xl border border-white/10 bg-teal-950/70">
            <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="text-sm font-semibold text-white">Restock priority</h2>
              <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Export</button>
            </header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-teal-200/80">
                  <tr>
                    {['SKU', 'Location', 'Days remaining', 'Supplier'].map((head) => (
                      <th key={head} className="px-6 py-3">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['SKU-8831', 'Dubai hub', '2 days', 'Aurum'],
                    ['SKU-1294', 'Berlin hub', '6 days', 'Northwind'],
                    ['SKU-4412', 'Riyadh hub', '4 days', 'Omega'],
                  ].map((row) => (
                    <tr key={row[0]} className="transition hover:bg-teal-500/10">
                      {row.map((cell) => (
                        <td key={cell} className="px-6 py-3 text-white/80">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <button
        className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-teal-950 shadow-xl shadow-teal-500/30 transition hover:-translate-y-0.5"
        aria-label="Add inventory"
      >
        Add stock
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-teal-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-lg translate-y-6 rounded-3xl border border-teal-500/40 bg-teal-950/95 p-6 text-teal-50 shadow-2xl transition data-[state=open]:translate-y-0">
          <h2 className="text-lg font-semibold">Invite supplier</h2>
          <p className="mt-2 text-sm text-teal-200/80">Share restock schedule and vendor compliance tasks.</p>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2" placeholder="Supplier email" />
            <textarea className="h-24 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Notes" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-teal-500 px-4 py-2 text-xs font-semibold text-teal-950">Send invite</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
