import { Suspense, lazy } from "react";

const AsyncChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="rounded-2xl border border-rose-400/40 bg-rose-400/10 p-5">
        <p className="text-sm font-semibold text-rose-100">Hiring pipeline</p>
        <div className="mt-4 h-36 rounded-xl border border-rose-400/20 bg-rose-900/60"></div>
      </div>
    ),
  })
);

export default function Dashboard18() {
  return (
    <div className="min-h-screen bg-rose-950 text-rose-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5">
        <div>
          <h1 className="text-lg font-semibold text-white">People ops</h1>
          <p className="text-sm text-white/70">Headcount, hiring funnel, and engagement signals.</p>
        </div>
        <div className="flex items-center gap-2">
          {['Primary', 'Secondary', 'Archive'].map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-rose-400/40 hover:text-white"
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
              className="rounded-2xl border border-white/10 bg-rose-900/60 p-5 transition hover:border-rose-400/30"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">{metric}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{(idx + 1) * 24}k</p>
            </article>
          ))}
        </div>

        <Suspense fallback={(<div className="h-56 animate-pulse rounded-2xl border border-rose-400/20 bg-rose-900/60"></div>)}>
          <AsyncChart />
        </Suspense>

        <div className="rounded-2xl border border-white/10 bg-rose-900/40">
          <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <h3 className="text-sm font-semibold text-white">Open roles</h3>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">View</button>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-white/60">
                <tr>
<th className="px-6 py-3">Role</th><th className="px-6 py-3">Stage</th><th className="px-6 py-3">Candidates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Product Manager</td>
                <td className="px-6 py-3 text-white/80">Final</td>
                <td className="px-6 py-3 text-white/80">3</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Backend Engineer</td>
                <td className="px-6 py-3 text-white/80">Onsite</td>
                <td className="px-6 py-3 text-white/80">5</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Designer</td>
                <td className="px-6 py-3 text-white/80">Screen</td>
                <td className="px-6 py-3 text-white/80">8</td>
              </tr>
                      </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          <section className="rounded-2xl border border-white/10 bg-rose-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Engagement score</h3>
              <span className="text-xs text-white/60">Pulse survey</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-rose-900/50"></div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-rose-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Upcoming reviews</h3>
              <span className="text-xs text-white/60">This month</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-rose-900/50"></div>
          </section>

        </div>
      </main>

      <button
        className="fixed bottom-8 end-8 rounded-full bg-rose-400 px-5 py-3 text-sm font-semibold text-rose-950 shadow-lg shadow-rose-400/30"
        aria-label="Invite candidate"
      >
        Invite
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-rose-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-md scale-95 rounded-3xl border border-rose-400/30 bg-rose-950/95 p-6 text-rose-50 transition data-[state=open]:scale-100">
          <h2 className="text-lg font-semibold">Send invitation</h2>
          <p className="mt-2 text-sm text-white/70">Share interview schedule and preparation resources.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2" placeholder=Candidate email />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-rose-400 px-4 py-2 text-xs font-semibold text-rose-950">Send</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
