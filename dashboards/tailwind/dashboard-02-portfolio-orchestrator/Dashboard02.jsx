import { Suspense, lazy } from "react";

const TimelineChart = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="h-full w-full rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-900/80 to-emerald-950 p-6">
        <p className="text-sm font-semibold text-emerald-100">Milestone timeline</p>
        <div className="mt-4 space-y-3">
          {["Design", "Build", "QA", "Launch"].map((phase) => (
            <div key={phase} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <div className="flex-1 rounded-full bg-emerald-500/20">
                <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${Math.random() * 80 + 20}%` }} />
              </div>
              <span className="text-xs text-emerald-200/80">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  })
);

export default function Dashboard02() {
  const swimlanes = [
    { title: "Discovery", items: ["Brief kickoff", "Stakeholder map"] },
    { title: "In progress", items: ["Prototype build", "API contract"] },
    { title: "Review", items: ["Security audit", "Legal approval"] },
  ];

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50">
      <div className="grid min-h-screen lg:grid-cols-[88px_320px_1fr]">
        <nav className="hidden border-r border-emerald-500/20 bg-emerald-950/80 py-10 lg:flex lg:flex-col lg:items-center lg:gap-6">
          {[
            { icon: "🏠", label: "Home" },
            { icon: "🗂", label: "Portfolio" },
            { icon: "🧭", label: "Roadmap" },
            { icon: "📊", label: "Reports" },
            { icon: "⚙️", label: "Settings" },
          ].map((item, index) => (
            <button
              key={item.label}
              className={`group flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-900/60 text-2xl transition hover:border-emerald-400/40 hover:text-emerald-200 ${index === 1 ? "aria-[current=true]:border-emerald-400 aria-[current=true]:bg-emerald-400/20" : ""}`}
              aria-current={index === 1}
            >
              <span className="transition group-hover:scale-110">{item.icon}</span>
            </button>
          ))}
        </nav>

        <aside className="flex flex-col gap-6 border-r border-emerald-500/20 bg-emerald-900/40 p-8">
          <header>
            <h1 className="text-lg font-semibold text-white">Portfolio orchestrator</h1>
            <p className="text-sm text-emerald-200/80">Track delivery health across initiatives.</p>
          </header>

          <div className="space-y-4">
            {["Velocity", "Risks", "People"].map((chip) => (
              <button
                key={chip}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {chip}
              </button>
            ))}
          </div>

          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-emerald-200/70">Project health</h2>
            {["Atlas redesign", "Payments revamp", "Infra uplift"].map((project, idx) => (
              <div key={project} className="rounded-2xl border border-emerald-500/20 bg-emerald-950/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{project}</p>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100">{idx === 0 ? "On track" : idx === 1 ? "At risk" : "Monitor"}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-emerald-500/20">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${60 + idx * 15}%` }} />
                </div>
              </div>
            ))}
          </section>

          <footer className="mt-auto space-y-3">
            <button className="w-full rounded-2xl border border-emerald-500/20 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30">
              Open risks board
            </button>
            <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white">
              Resource planner
            </button>
          </footer>
        </aside>

        <main className="flex flex-col gap-6 p-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Roadmap view</h2>
                <p className="text-xs text-emerald-200/70">Last sync: 4m ago</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/80 transition hover:border-white/30 hover:text-white">
                  Filters
                </button>
                <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-emerald-950 shadow transition hover:-translate-y-0.5 hover:bg-emerald-400">
                  Publish update
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/60 p-6">
              <h3 className="text-sm font-semibold text-white">Kanban lanes</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {swimlanes.map((lane) => (
                  <article key={lane.title} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-emerald-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{lane.title}</p>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100">{lane.items.length}</span>
                    </div>
                    <div className="space-y-3">
                      {lane.items.map((card) => (
                        <div key={card} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80 transition hover:border-emerald-400/40 hover:text-white">
                          {card}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl border border-emerald-500/20 bg-emerald-900/50" />}>
              <TimelineChart />
            </Suspense>
          </section>

          <section className="rounded-3xl border border-white/10 bg-emerald-950/60">
            <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h3 className="text-sm font-semibold text-white">Upcoming milestones</h3>
              <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white">
                Add checkpoint
              </button>
            </header>
            <div className="divide-y divide-white/10">
              {["API readiness", "Beta release", "Launch prep"].map((item, index) => (
                <div key={item} className="flex items-center justify-between px-6 py-4 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span>{item}</span>
                  </div>
                  <span className="text-xs text-emerald-200/70">{index === 0 ? "Aug 12" : index === 1 ? "Aug 26" : "Sep 4"}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <button
        className="fixed bottom-8 start-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-emerald-950 shadow-xl shadow-emerald-500/30 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-200"
        aria-label="Create new project"
      >
        ＋
      </button>
    </div>
  );
}
