import { Suspense, lazy } from "react";

const GrowthVelocityChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="h-full w-full rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-900/70 via-slate-950 to-slate-950/90 p-6">
        <p className="text-sm font-medium text-indigo-200">Growth velocity (async)</p>
        <div className="mt-6 h-40 rounded-2xl border border-indigo-500/20 bg-slate-900/80"></div>
      </div>
    ),
  })
);

const RetentionHeatmap = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="h-full w-full rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-slate-950 via-indigo-900/60 to-slate-900 p-6">
        <p className="text-sm font-medium text-indigo-200">Retention cohorts</p>
        <div className="mt-6 grid h-40 grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="h-8 rounded-lg bg-indigo-500/30 transition duration-200 hover:bg-indigo-400/40"
            />
          ))}
        </div>
      </div>
    ),
  })
);

export default function Dashboard01() {
  return (
    <div className="min-h-screen bg-slate-950/95 text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="relative hidden border-r border-indigo-500/20 bg-gradient-to-b from-indigo-950/80 to-slate-950/90 p-8 lg:flex lg:flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.35em] text-indigo-300">Pulse</span>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white">Collapse</button>
          </div>
          <div className="mt-8 space-y-6">
            {[
              "Overview",
              "Acquisition",
              "Retention",
              "Revenue",
              "Experiments",
            ].map((item) => (
              <button
                key={item}
                className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>{item}</span>
                <span className="text-xs text-indigo-200/70">⌘{item[0]}</span>
              </button>
            ))}
          </div>
          <div className="mt-auto rounded-3xl border border-indigo-500/20 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-indigo-200">Growth runway</p>
            <p className="mt-3 text-3xl font-semibold text-white">18</p>
            <p className="text-sm text-indigo-200/80">months of cash</p>
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="px-6 py-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-semibold text-white">Growth analytics</h1>
                  <p className="text-sm text-indigo-200/80">Monitoring acquisition, activation, and retention.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white">Filters</button>
                  <button className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-400">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-8 px-6 pb-24">
            <section className="grid gap-6 lg:grid-cols-4">
              {[
                { label: "MRR", value: "$128k", trend: "+12%" },
                { label: "Net retention", value: "106%", trend: "+3.4%" },
                { label: "Activation", value: "68%", trend: "+5%" },
                { label: "Churn", value: "2.1%", trend: "-0.4%" },
              ].map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/20"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-widest text-indigo-200/80">
                      {metric.label}
                    </span>
                    <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-100">{metric.trend}</span>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                  <div className="mt-4 h-2 rounded-full bg-indigo-500/20">
                    <div className="h-full rounded-full bg-indigo-400" style={{ width: "75%" }} />
                  </div>
                </article>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl border border-indigo-500/20 bg-slate-900/70" />}>
                <GrowthVelocityChart />
              </Suspense>
              <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl border border-indigo-500/20 bg-slate-900/70" />}>
                <RetentionHeatmap />
              </Suspense>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70">
                <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <div>
                    <h2 className="text-sm font-semibold text-white">Acquisition channels</h2>
                    <p className="text-xs text-indigo-200/80">Last 30 days</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white">
                      Cohorts
                    </button>
                    <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white">
                      Regions
                    </button>
                  </div>
                </header>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-sm">
                    <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-indigo-200">
                      <tr>
                        {['Channel', 'Signups', 'Activation', 'LTV'].map((head) => (
                          <th key={head} className="px-6 py-3">{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        ['Product Hunt', '1,204', '72%', '$312'],
                        ['Ads', '980', '51%', '$180'],
                        ['Partners', '642', '63%', '$420'],
                        ['Content', '1,820', '70%', '$280'],
                      ].map((row) => (
                        <tr key={row[0]} className="transition hover:bg-white/5">
                          {row.map((cell) => (
                            <td key={cell} className="px-6 py-4 text-white/80">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-5">
                  <h3 className="text-sm font-semibold text-white">Activation experiment</h3>
                  <p className="mt-2 text-sm text-indigo-100/80">
                    Running onboarding personalization test targeting new workspaces.
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20">
                    View variant plan
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <h3 className="text-sm font-semibold text-white">Tasks</h3>
                  <ul className="mt-3 space-y-3 text-sm text-white/70">
                    <li className="flex items-center justify-between">
                      <span>Sync lifecycle email cohort</span>
                      <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-200">Due today</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Update payback period model</span>
                      <span className="text-xs text-white/50">Tomorrow</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Ship milestone report</span>
                      <span className="text-xs text-white/50">Fri</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <button
        className="fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-2xl shadow-indigo-500/40 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Open growth insights"
      >
        ✦
      </button>

      <div
        id="experiment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experiment-modal-title"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 backdrop-blur transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-xl scale-95 rounded-3xl border border-indigo-500/40 bg-slate-950/90 p-8 text-white shadow-2xl transition data-[state=open]:scale-100">
          <h2 id="experiment-modal-title" className="text-lg font-semibold">Onboarding personalization</h2>
          <p className="mt-3 text-sm text-white/70">
            Personalize lifecycle touchpoints based on industry tag to increase activation by 5%.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-indigo-400">
              Approve run
            </button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white">
              Schedule review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
