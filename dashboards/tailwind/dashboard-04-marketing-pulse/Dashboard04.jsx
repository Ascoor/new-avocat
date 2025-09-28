import { Suspense, lazy } from "react";

const AttributionDonut = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="flex h-full flex-col rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-900/80 to-rose-950 p-6">
        <p className="text-sm font-semibold text-rose-100">Attribution split</p>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <div className="h-36 w-36 rounded-full border-[12px] border-rose-400/60 border-t-rose-500/90 border-b-rose-600/40"></div>
        </div>
      </div>
    ),
  })
);

const ConversionTrend = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="h-full rounded-3xl border border-rose-500/40 bg-rose-950/70 p-6">
        <div className="flex items-center justify-between text-sm text-rose-100">
          <span>Conversion trend</span>
          <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs">30d</span>
        </div>
        <div className="mt-6 h-32 rounded-2xl border border-rose-500/20 bg-rose-900/40"></div>
      </div>
    ),
  })
);

export default function Dashboard04() {
  const metrics = [
    { label: "Spend", value: "$92.4k", change: "+8%" },
    { label: "ROAS", value: "3.4x", change: "+0.6" },
    { label: "CPA", value: "$14.20", change: "-5%" },
    { label: "Leads", value: "12.4k", change: "+12%" },
  ];

  return (
    <div className="min-h-screen bg-rose-950 text-rose-50">
      <div className="grid min-h-screen gap-8 p-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden flex-col gap-6 border-r border-rose-500/20 bg-rose-950/70 p-8 lg:flex">
          <div>
            <h1 className="text-lg font-semibold text-white">Marketing pulse</h1>
            <p className="text-sm text-rose-200/80">Live attribution and campaign intelligence.</p>
          </div>
          <nav className="space-y-3 text-sm text-rose-100/80">
            {["Overview", "Acquisition", "Retention", "Audience", "Settings"].map((item, index) => (
              <button
                key={item}
                className={`flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-rose-200 ${index === 0 ? "border-rose-500/40 text-white" : ""}`}
              >
                <span>{item}</span>
                <span className="text-xs">→</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-3xl border border-rose-500/20 bg-rose-500/10 p-5">
            <p className="text-xs uppercase tracking-widest text-rose-200/80">Top campaign</p>
            <p className="mt-3 text-2xl font-semibold text-white">Aurora launch</p>
            <p className="text-xs text-rose-200/70">142% lift vs baseline</p>
          </div>
        </aside>

        <main className="space-y-6">
          <header className="sticky top-0 z-20 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Overview</h2>
                <p className="text-sm text-rose-200/80">Last synced 5 minutes ago</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['Last 7d', 'Last 30d', 'Quarter'].map((range) => (
                  <button key={range} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-rose-400/40 hover:text-white">
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-rose-950/70 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-rose-200/80">{metric.label}</span>
                  <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs text-rose-100">{metric.change}</span>
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl border border-rose-500/30 bg-rose-900/50" />}>
              <AttributionDonut />
            </Suspense>
            <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl border border-rose-500/30 bg-rose-900/50" />}>
              <ConversionTrend />
            </Suspense>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-white/10 bg-rose-950/70">
              <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Channel performance</h3>
                  <p className="text-xs text-rose-200/70">CPA vs spend</p>
                </div>
                <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white">
                  Segment
                </button>
              </header>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-rose-200/80">
                    <tr>
                      {['Channel', 'Spend', 'CPA', 'Conversions'].map((head) => (
                        <th key={head} className="px-6 py-3">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      ['Paid social', '$32.4k', '$18.20', '2,320'],
                      ['Search', '$18.2k', '$12.80', '3,120'],
                      ['Email', '$5.4k', '$6.10', '1,840'],
                      ['Affiliates', '$8.6k', '$9.50', '1,020'],
                    ].map((row) => (
                      <tr key={row[0]} className="transition hover:bg-rose-500/10">
                        {row.map((cell) => (
                          <td key={cell} className="px-6 py-3 text-white/80">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <aside className="space-y-4">
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-5">
                <h3 className="text-sm font-semibold text-white">Audience segments</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li className="flex items-center justify-between">
                    <span>Creators</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">42%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Developers</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">33%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Agencies</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">25%</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-rose-950/70 p-5">
                <h3 className="text-sm font-semibold text-white">Next action</h3>
                <p className="mt-2 text-sm text-white/70">Launch retargeting on high-intent segments.</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/80 transition hover:border-white/30 hover:text-white">
                  Create variation
                </button>
              </div>
            </aside>
          </section>
        </main>
      </div>

      <button
        className="fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/30 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-rose-200"
        aria-label="Create campaign"
      >
        ✹
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-rose-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-lg scale-95 rounded-3xl border border-rose-500/40 bg-rose-950/95 p-6 text-rose-50 shadow-2xl transition data-[state=open]:scale-100">
          <h2 className="text-lg font-semibold">New campaign</h2>
          <p className="mt-2 text-sm text-rose-200/80">Draft a multichannel activation plan with collaborative brief.</p>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-rose-200/80">Name</span>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300" />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-rose-200/80">Budget</span>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300" />
            </label>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white">Save</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
