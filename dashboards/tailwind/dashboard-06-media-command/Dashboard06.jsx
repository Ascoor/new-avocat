import { Suspense, lazy } from "react";

const EngagementChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-slate-900 p-5">
        <p className="text-sm font-semibold text-amber-100">Engagement</p>
        <div className="mt-4 h-32 rounded-xl border border-amber-400/20 bg-slate-900/60"></div>
      </div>
    ),
  })
);

export default function Dashboard06() {
  const schedule = [
    { slot: "09:00", title: "Morning briefing" },
    { slot: "10:30", title: "Product spotlight" },
    { slot: "12:00", title: "Live Q&A" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr_320px]">
        <aside className="hidden flex-col gap-4 border-r border-slate-700/40 bg-slate-950/80 p-6 lg:flex">
          <div>
            <h1 className="text-lg font-semibold text-white">Media command</h1>
            <p className="text-sm text-slate-300/80">Control live programming and monitor signals.</p>
          </div>
          <nav className="space-y-3 text-sm">
            {schedule.map((item) => (
              <button key={item.slot} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition hover:bg-white/10">
                <span>{item.slot}</span>
                <span className="text-xs">{item.title}</span>
              </button>
            ))}
          </nav>
          <button className="mt-auto rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">Upload clip</button>
        </aside>

        <main className="flex flex-col gap-6 p-6">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Live control</h2>
              <p className="text-sm text-slate-300/80">Channel 1 · 4K · 60fps</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Schedule</button>
              <button className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-amber-400/40">
                Go live
              </button>
            </div>
          </header>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">Preview</span>
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-200">LIVE</span>
              </div>
              <div className="mt-4 h-56 rounded-xl border border-white/5 bg-slate-900/60"></div>
              <div className="mt-4 grid gap-3 text-sm text-white/80 md:grid-cols-3">
                {["Stream", "Record", "Markers"].map((action) => (
                  <button key={action} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-amber-400/40 hover:text-white">
                    {action}
                  </button>
                ))}
              </div>
            </div>
            <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl border border-amber-400/20 bg-slate-900/40" />}>
              <EngagementChart />
            </Suspense>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="group rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-amber-400/30">
                <div className="aspect-video rounded-xl bg-slate-800/60 transition group-hover:scale-[1.02]"></div>
                <p className="mt-3 text-sm text-white/80">Clip #{idx + 1}</p>
              </div>
            ))}
          </section>
        </main>

        <aside className="hidden flex-col gap-4 border-l border-slate-700/40 bg-slate-950/80 p-6 lg:flex">
          <h3 className="text-sm font-semibold text-white">Moderation feed</h3>
          <div className="space-y-3 text-sm text-white/70">
            {['Comment flagged', 'New subscriber', 'Report resolved'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">{item}</div>
            ))}
          </div>
        </aside>
      </div>

      <button
        className="fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-xl shadow-amber-400/40"
        aria-label="Start broadcast"
      >
        ▶
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100"
      >
        <div className="w-full max-w-md scale-95 rounded-3xl border border-amber-400/30 bg-slate-950/95 p-6 text-slate-100 transition data-[state=open]:scale-100">
          <h2 className="text-lg font-semibold">Upload clip</h2>
          <p className="mt-2 text-sm text-slate-300/80">Drop media files or connect to remote source.</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Select file</button>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Connect cloud</button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-900">Upload</button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
