import { Suspense, lazy } from "react";

const AsyncChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="rounded-2xl border border-lime-400/40 bg-lime-400/10 p-5">
        <p className="text-sm font-semibold text-lime-100">Load vs supply</p>
        <div className="mt-4 h-36 rounded-xl border border-lime-400/20 bg-emerald-900/60"></div>
      </div>
    ),
  })
);

export default function Dashboard16() {
  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5">
        <div>
          <h1 className="text-lg font-semibold text-white">Energy grid</h1>
          <p className="text-sm text-white/70">Generation mix, load balance, and outage alerts.</p>
        </div>
        <div className="flex items-center gap-2">
          {['Primary', 'Secondary', 'Archive'].map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-lime-400/40 hover:text-white"
            >
              {chip}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {['Metric A', 'Metric B', 'Metric C'].map((metric, idx) => (
            <article
              key={metric}
              className="rounded-2xl border border-white/10 bg-emerald-900/60 p-5 transition hover:border-lime-400/30"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">{metric}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{(idx + 1) * 24}k</p>
            </article>
          ))}
        </div>

        <Suspense fallback={(<div className="h-56 animate-pulse rounded-2xl border border-lime-400/20 bg-emerald-900/60"></div>)}>
          <AsyncChart />
        </Suspense>

        <div className="rounded-2xl border border-white/10 bg-emerald-900/40">
          <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <h3 className="text-sm font-semibold text-white">Grid events</h3>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Acknowledge</button>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-white/60">
                <tr>
<th className="px-6 py-3">Event</th><th className="px-6 py-3">Region</th><th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Line overload</td>
                <td className="px-6 py-3 text-white/80">North</td>
                <td className="px-6 py-3 text-white/80">Investigating</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Wind spike</td>
                <td className="px-6 py-3 text-white/80">Coastal</td>
                <td className="px-6 py-3 text-white/80">Balancing</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Battery dispatch</td>
                <td className="px-6 py-3 text-white/80">Central</td>
                <td className="px-6 py-3 text-white/80">Active</td>
              </tr>
                      </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          <section className="rounded-2xl border border-white/10 bg-emerald-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Generation mix</h3>
              <span className="text-xs text-white/60">Real-time</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-emerald-900/50"></div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-emerald-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Storage levels</h3>
              <span className="text-xs text-white/60">Battery sites</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-emerald-900/50"></div>
          </section>

        </div>
      </main>

      <button
        className="fixed bottom-8 end-8 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-lime-400/30"
        aria-label="Rebalance grid"
      >
        Balance
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-emerald-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-md scale-95 rounded-3xl border border-lime-400/30 bg-emerald-950/95 p-6 text-emerald-50 transition data-[state=open]:scale-100">
          <h2 className="text-lg font-semibold">Balance instruction</h2>
          <p className="mt-2 text-sm text-white/70">Issue command to adjust generation assets.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2" placeholder=Dispatch details />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-lime-400 px-4 py-2 text-xs font-semibold text-emerald-950">Dispatch</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
