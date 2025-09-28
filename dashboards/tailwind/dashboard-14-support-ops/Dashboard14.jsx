import { Suspense, lazy } from "react";

const AsyncChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-5">
        <p className="text-sm font-semibold text-violet-100">Resolution time</p>
        <div className="mt-4 h-36 rounded-xl border border-violet-500/20 bg-violet-900/60"></div>
      </div>
    ),
  })
);

export default function Dashboard14() {
  return (
    <div className="min-h-screen bg-violet-950 text-violet-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5">
        <div>
          <h1 className="text-lg font-semibold text-white">Support ops</h1>
          <p className="text-sm text-white/70">Ticket queues, SLA adherence, and agent workload.</p>
        </div>
        <div className="flex items-center gap-2">
          {['Primary', 'Secondary', 'Archive'].map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-violet-500/40 hover:text-white"
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
              className="rounded-2xl border border-white/10 bg-violet-900/60 p-5 transition hover:border-violet-500/30"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">{metric}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{(idx + 1) * 24}k</p>
            </article>
          ))}
        </div>

        <Suspense fallback={(<div className="h-56 animate-pulse rounded-2xl border border-violet-500/20 bg-violet-900/60"></div>)}>
          <AsyncChart />
        </Suspense>

        <div className="rounded-2xl border border-white/10 bg-violet-900/40">
          <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <h3 className="text-sm font-semibold text-white">Active tickets</h3>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Filter</button>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-white/60">
                <tr>
<th className="px-6 py-3">Ticket</th><th className="px-6 py-3">Queue</th><th className="px-6 py-3">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">#3920</td>
                <td className="px-6 py-3 text-white/80">Billing</td>
                <td className="px-6 py-3 text-white/80">2h</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">#3914</td>
                <td className="px-6 py-3 text-white/80">Technical</td>
                <td className="px-6 py-3 text-white/80">1h</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">#3908</td>
                <td className="px-6 py-3 text-white/80">Onboarding</td>
                <td className="px-6 py-3 text-white/80">3h</td>
              </tr>
                      </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          <section className="rounded-2xl border border-white/10 bg-violet-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">SLA adherence</h3>
              <span className="text-xs text-white/60">Last 24h</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-violet-900/50"></div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-violet-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Agent load</h3>
              <span className="text-xs text-white/60">Per shift</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-violet-900/50"></div>
          </section>

        </div>
      </main>

      <button
        className="fixed bottom-8 end-8 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-violet-950 shadow-lg shadow-violet-500/30"
        aria-label="Escalate priority ticket"
      >
        Escalate
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-violet-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-md scale-95 rounded-3xl border border-violet-500/30 bg-violet-950/95 p-6 text-violet-50 transition data-[state=open]:scale-100">
          <h2 className="text-lg font-semibold">Escalate ticket</h2>
          <p className="mt-2 text-sm text-white/70">Notify tier-2 team with full context and logs.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2" placeholder=Escalation reason />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-violet-500 px-4 py-2 text-xs font-semibold text-violet-950">Escalate</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
