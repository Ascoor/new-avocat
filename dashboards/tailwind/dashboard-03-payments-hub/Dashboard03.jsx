import { Suspense, lazy } from "react";

const RevenueChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="h-full w-full rounded-3xl border border-blue-500/40 bg-blue-950/60 p-6">
        <div className="flex items-center justify-between text-sm text-blue-100">
          <span>Revenue streams</span>
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs">Live</span>
        </div>
        <div className="mt-6 h-36 rounded-2xl border border-blue-500/20 bg-blue-900/40"></div>
      </div>
    ),
  })
);

const VolumeChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="h-full w-full rounded-3xl border border-blue-500/40 bg-slate-950/60 p-6">
        <p className="text-sm font-medium text-blue-100">Volume comparison</p>
        <div className="mt-5 grid h-32 grid-cols-8 items-end gap-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="rounded-t-2xl bg-blue-500/40" style={{ height: `${40 + idx * 8}px` }} />
          ))}
        </div>
      </div>
    ),
  })
);

export default function Dashboard03() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="flex flex-col gap-6 border-r border-blue-500/20 bg-slate-950/70 p-6">
          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-200">PH</span>
            Payments hub
          </button>
          <div className="space-y-4">
            {["Overview", "Balances", "Payouts", "Compliance", "Settings"].map((item, index) => (
              <button
                key={item}
                className={`flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-300 ${index === 1 ? "border-blue-500/40 text-white" : ""}`}
              >
                <span>{item}</span>
                <span className="text-xs text-blue-200/80">{index === 1 ? "•" : "→"}</span>
              </button>
            ))}
          </div>
          <div className="mt-auto space-y-3">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-blue-200/80">Clearing balance</p>
              <p className="mt-3 text-2xl font-semibold text-white">$482,901</p>
              <p className="text-xs text-blue-200/70">Next release in 2h</p>
            </div>
            <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white">
              Configure accounts
            </button>
          </div>
        </aside>

        <main className="flex flex-col gap-6 p-6">
          <header className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/30 to-blue-500/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold text-white">Realtime settlements</h1>
                <p className="text-sm text-blue-100/80">Monitor cash flow across regions and providers.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80 transition hover:border-white/30 hover:text-white">
                  Filters
                </button>
                <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-400">
                  Generate report
                </button>
              </div>
            </div>
          </header>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Suspense fallback={<div className="h-56 animate-pulse rounded-3xl border border-blue-500/20 bg-slate-900/50" />}>
              <RevenueChart />
            </Suspense>
            <Suspense fallback={<div className="h-56 animate-pulse rounded-3xl border border-blue-500/20 bg-slate-900/50" />}>
              <VolumeChart />
            </Suspense>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70">
              <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Settlement queue</h2>
                  <p className="text-xs text-blue-200/70">Last sync 45s ago</p>
                </div>
                <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white">
                  Export CSV
                </button>
              </header>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-blue-200/80">
                    <tr>
                      {['Batch', 'Amount', 'Status', 'Clears'].map((head) => (
                        <th key={head} className="px-6 py-3">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      ['#1034', '$54,120', 'Pending', '08:35'],
                      ['#1033', '$87,900', 'Sent', '08:10'],
                      ['#1032', '$22,410', 'Flagged', '07:55'],
                      ['#1031', '$65,780', 'Sent', '07:40'],
                    ].map((row) => (
                      <tr key={row[0]} className="transition hover:bg-blue-500/10">
                        {row.map((cell) => (
                          <td key={cell} className="px-6 py-3 text-white/80">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <aside className="flex flex-col gap-4 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-5">
              <h3 className="text-sm font-semibold text-white">Compliance feed</h3>
              <ul className="space-y-3 text-sm text-white/80">
                {[
                  { label: "PSD2 webhook acknowledgment", time: "2m ago" },
                  { label: "KYB refresh requested", time: "18m ago" },
                  { label: "High-value transfer flagged", time: "32m ago" },
                ].map((item) => (
                  <li key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="text-xs text-blue-200/70">{item.time}</span>
                    </div>
                    <p className="mt-2 text-xs text-blue-200/80">Tap to review policy controls.</p>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </main>
      </div>

      <div
        data-role="filter-drawer"
        className="fixed inset-x-0 bottom-0 translate-y-full border-t border-white/10 bg-slate-950/95 p-6 shadow-2xl transition data-[state=open]:translate-y-0"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Region</button>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Provider</button>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Risk</button>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Reset</button>
            <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white">Apply</button>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-xl shadow-blue-500/30 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-200"
        aria-label="Create payout"
      >
        ⇪
      </button>
    </div>
  );
}
