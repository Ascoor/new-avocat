import { Suspense, lazy } from "react";

const AsyncChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-5">
        <p className="text-sm font-semibold text-emerald-100">Cashflow trend</p>
        <div className="mt-4 h-36 rounded-xl border border-emerald-400/20 bg-slate-900/60"></div>
      </div>
    ),
  })
);

export default function Dashboard13() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5">
        <div>
          <h1 className="text-lg font-semibold text-white">Finance command</h1>
          <p className="text-sm text-white/70">Cashflow, expenses, and forecast variance.</p>
        </div>
        <div className="flex items-center gap-2">
          {['Primary', 'Secondary', 'Archive'].map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-emerald-400/40 hover:text-white"
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
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-emerald-400/30"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">{metric}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{(idx + 1) * 24}k</p>
            </article>
          ))}
        </div>

        <Suspense fallback={(<div className="h-56 animate-pulse rounded-2xl border border-emerald-400/20 bg-slate-900/60"></div>)}>
          <AsyncChart />
        </Suspense>

        <div className="rounded-2xl border border-white/10 bg-slate-900/40">
          <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <h3 className="text-sm font-semibold text-white">Expense highlights</h3>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Audit</button>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-white/60">
                <tr>
<th className="px-6 py-3">Category</th><th className="px-6 py-3">Spend</th><th className="px-6 py-3">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Payroll</td>
                <td className="px-6 py-3 text-white/80">$520k</td>
                <td className="px-6 py-3 text-white/80">+2%</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Vendors</td>
                <td className="px-6 py-3 text-white/80">$180k</td>
                <td className="px-6 py-3 text-white/80">-1%</td>
              </tr>

              <tr className="transition hover:bg-white/5">
                <td className="px-6 py-3 text-white/80">Cloud</td>
                <td className="px-6 py-3 text-white/80">$98k</td>
                <td className="px-6 py-3 text-white/80">+5%</td>
              </tr>
                      </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Forecast</h3>
              <span className="text-xs text-white/60">Next quarter</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-slate-900/50"></div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Savings</h3>
              <span className="text-xs text-white/60">Opportunities</span>
            </header>
            <div className="mt-4 h-40 rounded-xl border border-white/5 bg-slate-900/50"></div>
          </section>

        </div>
      </main>

      <button
        className="fixed bottom-8 end-8 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30"
        aria-label="Share finance report"
      >
        Report
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-md scale-95 rounded-3xl border border-emerald-400/30 bg-slate-950/95 p-6 text-slate-50 transition data-[state=open]:scale-100">
          <h2 className="text-lg font-semibold">Approve expense</h2>
          <p className="mt-2 text-sm text-white/70">Confirm or reject the selected expense line.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2" placeholder=Approval note />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950">Approve</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}
