import json
from pathlib import Path
from textwrap import dedent

from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path(__file__).resolve().parent.parent
DASHBOARD_ROOT = BASE_DIR / "dashboards" / "tailwind"

DASHBOARDS = []


def fmt(text: str) -> str:
    return dedent(text).strip() + "\n"


def create_thumbnail(path: Path, background: str, title: str) -> None:
    width, height = 512, 320
    image = Image.new("RGB", (width, height), background)
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    text = title[:28]
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    draw.text(
        ((width - text_width) / 2, (height - text_height) / 2),
        text,
        fill=(255, 255, 255),
        font=font,
    )
    image.save(path)



def write_dashboard(entry: dict) -> None:
    directory = DASHBOARD_ROOT / entry["directory"]
    directory.mkdir(parents=True, exist_ok=True)

    jsx_path = directory / entry["assets"]["jsx"]
    css_path = directory / entry["assets"]["css"]
    readme_path = directory / entry["assets"]["readme"]
    thumb_path = directory / entry["assets"]["thumbnail"]

    jsx_path.write_text(fmt(entry["jsx"]), encoding="utf-8")
    css_path.write_text(fmt(entry["css"]), encoding="utf-8")
    readme_path.write_text(fmt(entry["readme"]), encoding="utf-8")

    create_thumbnail(thumb_path, entry["colors"]["primary"], entry["name"])


def main() -> None:
    manifest = {"dashboards": []}

    for entry in DASHBOARDS:
        write_dashboard(entry)
        manifest_entry = {
            key: entry[key]
            for key in [
                "id",
                "name",
                "description",
                "grid",
                "components",
                "colors",
                "snippets",
                "responsive",
                "accessibility",
                "interactions",
                "performance",
                "assets",
            ]
        }
        manifest_entry["directory"] = entry["directory"]
        manifest["dashboards"].append(manifest_entry)

    manifest_path = DASHBOARD_ROOT / "dashboard-catalog.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

DASHBOARDS.append(
    {
        "id": "dashboard-01",
        "directory": "dashboard-01-growth-analytics",
        "name": "Growth Analytics",
        "description": "لوحة SaaS تركز على مؤشرات النمو والاحتفاظ والقيمة مدى الحياة.",
        "grid": {
            "desktop": "12-column CSS grid — sidebar spans 2 columns, content spans 10 with nested grid (8/4 split).",
            "tablet": "Sidebar becomes slide-over width 280px using absolute positioning; main grid becomes single column with stacked sections.",
            "mobile": "Stacked layout with collapsible sidebar drawer, KPI cards become horizontal scroll using snap-x."
        },
        "components": [
            "Overlay sidebar with timeline footer",
            "Gradient top insight bar",
            "Metric cards grid",
            "Two chart panels (growth velocity, retention heatmap)",
            "Acquisition table",
            "Experiment modal",
            "Floating action insights button"
        ],
        "colors": {
            "primary": "#312e81",
            "accent": "#c4b5fd",
            "bg": "#020617",
            "surface": "#0f172a",
            "text": "#f8fafc"
        },
        "snippets": {
            "layout": "grid min-h-screen lg:grid-cols-[280px_1fr] bg-slate-950 text-slate-100",
            "sidebar": "relative flex flex-col gap-6 bg-gradient-to-br from-indigo-900/80 to-slate-900/90 backdrop-blur",
            "topbar": "flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4",
            "card": "rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg shadow-indigo-500/10",
            "chart": "h-64 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/60 to-slate-900/80",
            "table": "overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80",
            "filter": "flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2",
            "fab": "fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-xl",
            "modal": "rounded-3xl border border-indigo-500/40 bg-slate-950/95 p-8 shadow-2xl"
        },
        "responsive": {
            "desktop": "Sidebar pinned with full nav labels, charts in 8/4 split, experiment modal centered.",
            "tablet": "Sidebar hidden by default with \"data-open\" toggle, topbar wraps filters, cards grid becomes 2 columns.",
            "mobile": "Header condenses to icon buttons, cards become snap-x scroll, table converts to stacked cards with border separators."
        },
        "accessibility": [
            "ألوان بتركيز على نسبة تباين 4.8:1 مع خلفية غامقة.",
            "تنقل لوحة المفاتيح عبر ترتيب tabIndex مخصص لعناصر التصفية والأزرار.",
            "استخدام aria-expanded وaria-controls لأزرار فتح/إغلاق الشريط الجانبي والمودال."
        ],
        "interactions": [
            "زر لتوسيع الشريط الجانبي يضيف/يزيل الكلاس 'translate-x-full' على اللوحة.",
            "عناصر الكروت تستخدم transition duration-300 مع hover:-translate-y-1 وhover:shadow-indigo-500/25.",
            "المودال يظهر بإضافة data-state=\"open\" التي تزيل scale-95 وتزيد opacity من 0 إلى 100 باستخدام transition."
        ],
        "performance": [
            "تحميل lazy لمخططات النمو باستخدام React.lazy وSuspense داخل قسم التحليلات.",
            "استخدام IntersectionObserver لتفعيل عدادات KPI فقط عند ظهورها (وصف ضمن README).",
            "تقسيم كود الجدول في كتلة ديناميكية منفصلة عند الحاجة في المشاهد المحمولة."
        ],
        "assets": {
            "jsx": "Dashboard01.jsx",
            "css": "dashboard-01.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": """
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
""",
        "css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .glass-panel {
    @apply rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl;
  }
  .metric-pill {
    @apply rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-100;
  }
}
""",
        "readme": """
# Dashboard 01 – Growth Analytics

## Structure
- **Layout**: Two-column grid with immersive gradient sidebar and flexible content column.
- **Content**: KPI highlights, dual async charts, acquisition table, experiment summary, task list, floating action button, modal.

## Sidebar toggle
Use a `data-open` attribute on the root `<aside>` and toggle `translate-x-full` for tablet/mobile overlays.

## Lazy loading
Charts are wrapped with `React.Suspense` and defined through inline `lazy` factories to emulate async loading.

## Notes
- Filters are rounded pills that respond to keyboard focus with `focus-visible:ring`.
- KPI counters animate via CSS transitions; JS hooks can add incremental counters on intersection.
""",
    }
)
DASHBOARDS.append(
    {
        "id": "dashboard-02",
        "directory": "dashboard-02-portfolio-orchestrator",
        "name": "Portfolio Orchestrator",
        "description": "تخطيط مشاريع بواجهة مليئة بالجداول الزمنية ولوحات الحالة المتعددة.",
        "grid": {
            "desktop": "CSS grid with 80px icon rail, 320px stacked command panel, remaining area split into kanban + timeline.",
            "tablet": "Icon rail becomes top tabs; command panel collapses into accordions before kanban.",
            "mobile": "Single column with horizontal scroll kanban lists and collapsible timeline section."
        },
        "components": [
            "Icon rail sidebar",
            "Command palette panel",
            "Project health cards",
            "Kanban swimlanes",
            "Milestone timeline",
            "Filter drawer",
            "Floating create project button"
        ],
        "colors": {
            "primary": "#115e59",
            "accent": "#34d399",
            "bg": "#022c22",
            "surface": "#064e3b",
            "text": "#ecfdf5"
        },
        "snippets": {
            "layout": "grid min-h-screen bg-emerald-950 text-emerald-50 lg:grid-cols-[88px_320px_1fr]",
            "sidebar": "hidden border-r border-emerald-500/20 bg-emerald-950/80 lg:flex lg:flex-col",
            "topbar": "flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4",
            "card": "rounded-2xl border border-emerald-500/20 bg-emerald-900/60 p-4",
            "chart": "h-60 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900 to-emerald-950",
            "table": "rounded-2xl border border-white/10 bg-emerald-950/60",
            "filter": "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm",
            "fab": "fixed bottom-8 start-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-emerald-950",
            "modal": "rounded-3xl border border-emerald-500/40 bg-emerald-950/95 p-6"
        },
        "responsive": {
            "desktop": "Icon rail pinned left, command panel shows stacked cards, kanban uses 3 columns next to compact timeline strip.",
            "tablet": "Command panel collapses into horizontal slider above kanban; icon rail converts to segmented control topbar.",
            "mobile": "FAB anchors to bottom-left, kanban columns become snap-center horizontal lists, timeline condensed into accordion."
        },
        "accessibility": [
            "علامات aria-current على عناصر لوح الأيقونات لتوضيح القسم الحالي.",
            "استخدام أزرار بعرض كامل في command panel مع `focus-visible:ring-emerald-300`.",
            "نسب تباين ≥ 4.5:1 بين النص والخلفيات عبر استخدام طبقات emerald القاتمة." 
        ],
        "interactions": [
            "Hover على عناصر الكانبان يطبق shadow-lg shadow-emerald-500/20 وscale-95 عند السحب.",
            "فلتر اللوحة يفتح بانزلاق translate-y-full ويتم التحكم به عبر data-state.",
            "Timeline markers تعرض tooltip عبر group-hover مع transition duration-150."
        ],
        "performance": [
            "تقسيم مخطط الجدول الزمني في lazy component يظهر داخل Suspense fallback skeleton.",
            "استخدام requestIdleCallback لتجميع عدادات المهام بعد تحميل الشاشة.",
            "تحميل كسول لصور أعضاء الفريق عبر attribute loading=\"lazy\" في JSX." 
        ],
        "assets": {
            "jsx": "Dashboard02.jsx",
            "css": "dashboard-02.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": """
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
""",
        "css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .lane-card {
    @apply rounded-2xl border border-white/10 bg-emerald-900/60 p-4;
  }
  .icon-rail-button {
    @apply flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-900/60 text-2xl;
  }
}
""",
        "readme": """
# Dashboard 02 – Portfolio Orchestrator

## Structure
- **Layout**: Three-column grid (icon rail, command panel, workspace) optimized for wide desktops.
- **Content**: Project health meters, kanban lanes, async milestone timeline, milestone list, CTA footer.

## Sidebar toggle
On tablet/mobile add `data-open` attribute to the command panel and animate with `translate-x-full`.

## Lazy loading
`TimelineChart` is deferred via `React.lazy` with a shimmer fallback to emphasize streaming load.

## Notes
- Kanban items respond to hover and drag with Tailwind transitions.
- Filter button reveals slide-up drawer (see interactions list in manifest for classes).
""",
    }
)
DASHBOARDS.append(
    {
        "id": "dashboard-03",
        "directory": "dashboard-03-payments-hub",
        "name": "Payments Hub",
        "description": "مركز مدفوعات يربط التدفقات النقدية والتسوية والامتثال لحظيًا.",
        "grid": {
            "desktop": "Two column layout with 260px compact sidebar, main area split into 8/4 grid for revenue stream vs compliance feed.",
            "tablet": "Sidebar collapses to icon row on top, charts stack with settlement table below.",
            "mobile": "Single column with sticky balance widget and slide-up drawer for filters." 
        },
        "components": [
            "Compact sidebar",
            "Balance overview strip",
            "Revenue + volume charts",
            "Settlement table",
            "Compliance activity feed",
            "Filter drawer",
            "Floating payout button"
        ],
        "colors": {
            "primary": "#1d4ed8",
            "accent": "#60a5fa",
            "bg": "#0b1120",
            "surface": "#111827",
            "text": "#e2e8f0"
        },
        "snippets": {
            "layout": "grid min-h-screen bg-slate-950 text-slate-100 lg:grid-cols-[260px_1fr]",
            "sidebar": "flex flex-col gap-4 border-r border-blue-500/20 bg-slate-950/70 p-6",
            "topbar": "rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/30 to-blue-500/10 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-slate-900/60 p-5",
            "chart": "h-56 rounded-3xl border border-blue-500/30 bg-blue-950/60",
            "table": "rounded-3xl border border-white/10 bg-slate-950/70",
            "filter": "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs",
            "fab": "fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white",
            "modal": "rounded-3xl border border-blue-500/40 bg-slate-950/95 p-6"
        },
        "responsive": {
            "desktop": "Sidebar pinned with collapsed nav groups, charts side-by-side, compliance feed anchored right.",
            "tablet": "Sidebar becomes collapsible top nav, cards wrap into 2 columns, settlement table becomes scrollable.",
            "mobile": "Balance strip sticky at top, charts collapse into cards, filter drawer uses `translate-y-full`."
        },
        "accessibility": [
            "توفير aria-live=polite لقيم الرصيد كي يعلن القارئ أي تحديثات." ,
            "أزرار التصفية تعرض focus-visible:ring-2 focus-visible:ring-blue-300 للتمييز الواضح.",
            "استخدام aria-describedby للتنبيهات المالية في feed لضمان السياق." 
        ],
        "interactions": [
            "Hover على الصفوف في جدول التسوية يضيف bg-blue-500/10 مع transition.",
            "Drawer التصفية يتحكم به زر ي toggles data-state=open مع translate-y-full.",
            "FAB يضيف drop-shadow-xl shadow-blue-500/40 عند التركيز أو المرور." 
        ],
        "performance": [
            "مخططات الإيرادات محملة كسول عبر React.lazy مع fallback skeleton.",
            "Table rows يتم chunking عبر virtualization hook (موصى به في README).",
            "feed يأخذ بياناته عبر polling خامل يتم إيقافه عند إخفاء التبويب." 
        ],
        "assets": {
            "jsx": "Dashboard03.jsx",
            "css": "dashboard-03.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": """
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
""",
        "css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .balance-pill {
    @apply rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs text-blue-100;
  }
  .drawer-backdrop[data-state='open'] {
    @apply pointer-events-auto opacity-100;
  }
}
""",
        "readme": """
# Dashboard 03 – Payments Hub

## Structure
- **Layout**: Compact sidebar + analytics stage with dual charts, settlement table, and compliance feed panel.
- **Content**: Balance summary, async revenue chart, volume bars, settlement queue, bottom drawer filters, FAB.

## Sidebar toggle
Convert sidebar to overlay on tablet using `lg:hidden` fallback and `fixed inset-y-0` with translate transforms.

## Lazy loading
`RevenueChart` and `VolumeChart` lazy factories simulate heavy chart bundles; wrap them with `Suspense` for skeleton fallback.

## Notes
- Table rows highlight using Tailwind transitions, ready for row selection.
- Filter drawer uses `data-[state=open]:translate-y-0` to slide into view.
""",
    }
)
DASHBOARDS.append(
    {
        "id": "dashboard-04",
        "directory": "dashboard-04-marketing-pulse",
        "name": "Marketing Pulse",
        "description": "لوحة حملات تسويقية تركّز على معدلات التحويل، المزيج الإعلاني، وتوزيع القنوات.",
        "grid": {
            "desktop": "12-column layout with floating metric shelf, central canvas using CSS grid (7/5 split) for charts and channel table.",
            "tablet": "Top metrics collapse into two rows, charts stack, channel table becomes accordion.",
            "mobile": "Single column with sticky filter bar, cards convert to swipeable carousels." 
        },
        "components": [
            "Glass filter bar",
            "Metric shelf",
            "Attribution donut + conversion chart",
            "Channel performance table",
            "Audience segment widgets",
            "Campaign modal",
            "Floating create campaign button"
        ],
        "colors": {
            "primary": "#be123c",
            "accent": "#fb7185",
            "bg": "#130414",
            "surface": "#1f071a",
            "text": "#fdf2f8"
        },
        "snippets": {
            "layout": "min-h-screen bg-rose-950 text-rose-50",
            "sidebar": "hidden lg:flex w-72 flex-col gap-6 border-r border-rose-500/20 bg-rose-950/70 p-8",
            "topbar": "sticky top-0 z-20 flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur",
            "card": "rounded-3xl border border-white/10 bg-rose-950/60 p-5",
            "chart": "rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-900 to-rose-950",
            "table": "rounded-3xl border border-white/10 bg-rose-950/70",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs",
            "fab": "fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-rose-50",
            "modal": "rounded-3xl border border-rose-500/40 bg-rose-950/95 p-6"
        },
        "responsive": {
            "desktop": "Glass filter bar pinned on top, metrics use 4 column grid, charts share 7/5 grid region.",
            "tablet": "Sidebar hidden, filter bar becomes horizontal scroll, charts stacked with responsive height.",
            "mobile": "Filter bar sticky with overflow-x, metrics as horizontal scroll, table converts to cards." 
        },
        "accessibility": [
            "استعمال aria-pressed على أزرار القنوات لتوضيح الاختيار.",
            "عناصر filter bar تحصل على focus-visible:ring-rose-200.",
            "التباين أعلى من 4.6:1 بفضل الخلفيات الداكنة والنص الفاتح." 
        ],
        "interactions": [
            "Hover على الكروت يطبق translate-y-[-4px] وshadow-rose-500/20.",
            "Sidebar overlay يتم تفعيله عبر data-open مع backdrop-blur.",
            "Modal transition يستخدم scale-95 إلى scale-100 مع duration-200." 
        ],
        "performance": [
            "استخدام lazy لمخطط attribution وconversion.",
            "تقسيم البيانات الكبيرة للقنوات باستخدام dynamic import عند فتح الجدول.",
            "تأجيل تحميل صور الجمهور باستخدام loading=lazy." 
        ],
        "assets": {
            "jsx": "Dashboard04.jsx",
            "css": "dashboard-04.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": """
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
""",
        "css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .pulse-card {
    @apply rounded-3xl border border-white/10 bg-rose-950/70 p-5;
  }
  .filter-chip {
    @apply rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs;
  }
}
""",
        "readme": """
# Dashboard 04 – Marketing Pulse

## Structure
- **Layout**: Filter glass bar, metrics shelf, dual async charts, channel table, and actions sidebar.
- **Content**: Spend metrics, attribution donut, conversion trend, channel list, segment widgets, modal.

## Sidebar toggle
Sidebar hides below `lg` and can appear as overlay by toggling `fixed inset-0` with `translate-x-full` on the container.

## Lazy loading
`AttributionDonut` and `ConversionTrend` are lazy-defined for simulated heavy chart libs.

## Notes
- Filter chips use Tailwind transitions for hover + focus clarity.
- Table rows convert to cards on small screens via utility classes defined in README guidance.
""",
    }
)
DASHBOARDS.append(
    {
        "id": "dashboard-05",
        "directory": "dashboard-05-inventory-atlas",
        "name": "Inventory Atlas",
        "description": "نظام إدارة مخزون متعدد المستودعات مع تتبع للأصناف ومستويات التحذير.",
        "grid": {
            "desktop": "Full-width layout without traditional sidebar, uses sticky vertical tabs inside content splitting into 3-column grid.",
            "tablet": "Vertical tabs turn into horizontal scroll; 3 columns collapse to 2 with reorder of heatmap.",
            "mobile": "Single column stack with collapsible stock cards and sticky filter chip bar." 
        },
        "components": [
            "Sticky filter bar",
            "Vertical tabs navigation",
            "Stock level cards",
            "Warehouse heatmap",
            "Restock priority table",
            "Supplier modal",
            "Floating add stock button"
        ],
        "colors": {
            "primary": "#0f766e",
            "accent": "#2dd4bf",
            "bg": "#012b2a",
            "surface": "#023737",
            "text": "#ecfdf5"
        },
        "snippets": {
            "layout": "min-h-screen bg-teal-950 text-teal-50",
            "sidebar": "hidden",
            "topbar": "sticky top-0 z-30 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur",
            "card": "rounded-3xl border border-teal-500/20 bg-teal-900/60 p-5",
            "chart": "rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-900 to-teal-950",
            "table": "rounded-3xl border border-white/10 bg-teal-950/70",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs",
            "fab": "fixed bottom-8 start-1/2 z-40 -translate-x-1/2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-teal-950",
            "modal": "rounded-3xl border border-teal-500/40 bg-teal-950/95 p-6"
        },
        "responsive": {
            "desktop": "Tabs pinned left within content using sticky top spacing; grid uses 3 equal columns.",
            "tablet": "Tabs convert to horizontal scroll using flex-row, heatmap moves below cards.",
            "mobile": "Metrics cards become accordion with `data-open` state, filter chips sticky at top." 
        },
        "accessibility": [
            "العلامات التبويبية تستخدم role=tablist وaria-selected لتوضيح الحالة.",
            "استخدام focus-visible:ring-teal-200 على عناصر التحكم.",
            "التباين يحقق 4.7:1 على الأقل بين الخلفيات والنصوص." 
        ],
        "interactions": [
            "Hover على بطاقات المخزون يطبق ring-2 ring-teal-400/40.",
            "Heatmap الخلايا تستجيب بـ group-hover:scale-105.",
            "Modal يظهر بإزالة translate-y-6 وإضافة opacity-100 عبر data-state." 
        ],
        "performance": [
            "تحميل lazy لخريطة المخزون باستخدام React.lazy.",
            "تقسيم جدول الموردين في chunk منفصل يُستدعى عند فتح modal.",
            "استخدام CSS containment لتقليل إعادة الرسم في أقسام المخزون." 
        ],
        "assets": {
            "jsx": "Dashboard05.jsx",
            "css": "dashboard-05.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": """
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
""",
        "css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .inventory-card {
    @apply rounded-3xl border border-white/10 bg-teal-900/60 p-5;
  }
  .tab-button[aria-selected='true'] {
    @apply border-teal-400/40 text-white;
  }
}
""",
        "readme": """
# Dashboard 05 – Inventory Atlas

## Structure
- **Layout**: Header filter bar, sticky vertical tabs, stock cards, async heatmap, restock table, modal.
- **Content**: SKU overview, heatmap of utilization, restock priorities, supplier invite.

## Tabs
Tabs rely on `role="tablist"` with `aria-selected` for accessibility; toggle `translate-x-full` when converting to drawer.

## Lazy loading
`WarehouseHeatmap` uses `React.lazy` to defer heavy SVG/Canvas logic until visible.

## Notes
- CTA button centered at bottom for quick restock actions.
- Table becomes cards with `grid` utilities on narrow screens (documented in README guidance).
""",
    }
)
DASHBOARDS.append(
    {
        "id": "dashboard-06",
        "directory": "dashboard-06-media-command",
        "name": "Media Command",
        "description": "لوحة بث وسائط تدير الجداول، التحكم المباشر، ومراقبة المشاركة.",
        "grid": {
            "desktop": "Three zones: left stacked schedule rail (240px), central canvas with live controls, right insights column.",
            "tablet": "Schedule rail collapses into accordion, central canvas grows with two-row layout.",
            "mobile": "Single column; live controls sticky, schedule collapses to list with play buttons." 
        },
        "components": [
            "Broadcast schedule rail",
            "Live control panel",
            "Engagement charts",
            "Clip library grid",
            "Moderation feed",
            "Modal for clip upload",
            "Floating go-live button"
        ],
        "colors": {
            "primary": "#1f2937",
            "accent": "#facc15",
            "bg": "#0a0a0f",
            "surface": "#111827",
            "text": "#f9fafb"
        },
        "snippets": {
            "layout": "grid min-h-screen bg-slate-950 text-slate-100 lg:grid-cols-[240px_1fr_320px]",
            "sidebar": "hidden flex-col gap-4 border-r border-slate-700/40 bg-slate-950/80 p-6 lg:flex",
            "topbar": "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3",
            "card": "rounded-2xl border border-white/10 bg-slate-900/60 p-4",
            "chart": "rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-slate-900",
            "table": "rounded-2xl border border-white/10 bg-slate-950/70",
            "filter": "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs",
            "fab": "fixed bottom-8 end-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-slate-900",
            "modal": "rounded-3xl border border-amber-400/30 bg-slate-950/95 p-6"
        },
        "responsive": {
            "desktop": "Schedule rail pinned with upcoming slots, central grid shows live controls + clip grid, insights column shows metrics feed.",
            "tablet": "Columns collapse into two sections; insights slides under live controls using CSS order.",
            "mobile": "FAB centered bottom, schedule uses accordion cards, clip grid becomes horizontal scroll." 
        },
        "accessibility": [
            "أزرار التحكم المباشر لها aria-pressed مع وصف صوتي واضح.",
            "استخدام focus-visible:ring-amber-300 لعناصر التفاعل.",
            "الجدول يعلن الوقت المتبقي عبر aria-live." 
        ],
        "interactions": [
            "Hover على عناصر الجدول يضيف bg-amber-400/10 ويعرض زر التشغيل.",
            "Clip tiles تستخدم group-hover لتكبير المعاينة بscale-105.",
            "Modal يظهر عبر data-[state=open]:opacity-100 + scale-100." 
        ],
        "performance": [
            "مخطط التفاعل lazy داخل Suspense.",
            "Lazy import لمكتبة player controls عند الطلب.",
            "استخدام requestAnimationFrame لتحديث المؤقت بدلاً من setInterval." 
        ],
        "assets": {
            "jsx": "Dashboard06.jsx",
            "css": "dashboard-06.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": """
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
""",
        "css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .schedule-card {
    @apply rounded-2xl border border-white/10 bg-white/5 px-4 py-3;
  }
}
""",
        "readme": """
# Dashboard 06 – Media Command

## Structure
- **Layout**: Schedule rail, live control canvas, engagement column, moderation feed, modal.
- **Content**: Live preview, async engagement chart, clip grid, go-live FAB, upload modal.

## Schedule
Schedule rail toggles into overlay on tablet using `fixed inset-0` and `translate-x-full` classes controlled via JS.

## Lazy loading
`EngagementChart` is lazy-evaluated to simulate heavy analytics library.

## Notes
- Clip grid uses `group-hover` for subtle scaling.
- Moderation feed simple cards ready for virtualization when messages grow.
""",
    }
)

def build_simple_jsx(meta: dict) -> str:
    panels = "".join(
        f"""
          <section className=\"rounded-2xl border border-white/10 bg-{meta['bg_surface']} p-5\">
            <header className=\"flex items-center justify-between\">
              <h3 className=\"text-sm font-semibold text-white\">{panel['title']}</h3>
              <span className=\"text-xs text-white/60\">{panel['subtitle']}</span>
            </header>
            <div className=\"mt-4 h-40 rounded-xl border border-white/5 bg-{panel['body_bg']}\"></div>
          </section>
        """
        for panel in meta["panels"]
    )
    table_head = "".join(
        f"<th className=\"px-6 py-3\">{head}</th>" for head in meta["table_headers"]
    )
    table_body = ""
    for row in meta["table_rows"]:
        cells = "".join(
            f"                <td className=\"px-6 py-3 text-white/80\">{cell}</td>\n"
            for cell in row
        )
        table_body += f"""
              <tr className=\"transition hover:bg-white/5\">
{cells}              </tr>
        """
    return fmt(
        f"""
import {{ Suspense, lazy }} from "react";

const AsyncChart = lazy(() =>
  Promise.resolve({{
    default: () => (
      <div className=\"rounded-2xl border border-{meta['accent_border']}/40 bg-{meta['accent_bg']} p-5\">
        <p className=\"text-sm font-semibold text-{meta['accent_text']}\">{meta['chart_title']}</p>
        <div className=\"mt-4 h-36 rounded-xl border border-{meta['accent_border']}/20 bg-{meta['accent_inner']}\"></div>
      </div>
    ),
  }})
);

export default function {meta['component']}() {{
  return (
    <div className=\"min-h-screen bg-{meta['background']} text-{meta['text']}\">
      <header className=\"flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5\">
        <div>
          <h1 className=\"text-lg font-semibold text-white\">{meta['title']}</h1>
          <p className=\"text-sm text-white/70\">{meta['subtitle']}</p>
        </div>
        <div className=\"flex items-center gap-2\">
          {{['Primary', 'Secondary', 'Archive'].map((chip) => (
            <button
              key={{chip}}
              className=\"rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-{meta['accent_border']}/40 hover:text-white\"
            >
              {{chip}}
            </button>
          ))}}
        </div>
      </header>

      <main className=\"mx-auto flex max-w-6xl flex-col gap-6 p-6\">
        <div className=\"grid gap-4 md:grid-cols-2 xl:grid-cols-3\">
          {{['Metric A', 'Metric B', 'Metric C'].map((metric, idx) => (
            <article
              key={{metric}}
              className=\"rounded-2xl border border-white/10 bg-{meta['metric_bg']} p-5 transition hover:border-{meta['accent_border']}/30\"
            >
              <p className=\"text-xs uppercase tracking-widest text-white/60\">{{metric}}</p>
              <p className=\"mt-3 text-3xl font-semibold text-white\">{{(idx + 1) * 24}}k</p>
            </article>
          ))}}
        </div>

        <Suspense fallback={{(<div className=\"h-56 animate-pulse rounded-2xl border border-{meta['accent_border']}/20 bg-{meta['metric_bg']}\"></div>)}}>
          <AsyncChart />
        </Suspense>

        <div className=\"rounded-2xl border border-white/10 bg-{meta['bg_surface']}\">
          <header className=\"flex items-center justify-between border-b border-white/5 px-6 py-4\">
            <h3 className=\"text-sm font-semibold text-white\">{meta['table_title']}</h3>
            <button className=\"rounded-full border border-white/10 px-3 py-1 text-xs text-white/70\">{meta['table_action']}</button>
          </header>
          <div className=\"overflow-x-auto\">
            <table className=\"min-w-full divide-y divide-white/10 text-sm\">
              <thead className=\"bg-white/5 text-left text-xs uppercase tracking-widest text-white/60\">
                <tr>
{table_head}
                </tr>
              </thead>
              <tbody className=\"divide-y divide-white/5\">
{table_body}              </tbody>
            </table>
          </div>
        </div>

        <div className=\"grid gap-4 lg:grid-cols-2\">
{panels}
        </div>
      </main>

      <button
        className=\"fixed bottom-8 end-8 rounded-full bg-{meta['accent_button']} px-5 py-3 text-sm font-semibold text-{meta['button_text']} shadow-lg shadow-{meta['accent_border']}/30\"
        aria-label=\"{meta['button_label']}\"
      >
        {meta['button_text_label']}
      </button>

      <div
        role=\"dialog\"
        aria-modal=\"true\"
        className=\"pointer-events-none fixed inset-0 flex items-center justify-center bg-{meta['modal_backdrop']} opacity-0 transition data-[state=open]:pointer-events-auto data-[state=open]:opacity-100\"
      >
        <div className=\"w-full max-w-md scale-95 rounded-3xl border border-{meta['accent_border']}/30 bg-{meta['modal_surface']} p-6 text-{meta['text']} transition data-[state=open]:scale-100\">
          <h2 className=\"text-lg font-semibold\">{meta['modal_title']}</h2>
          <p className=\"mt-2 text-sm text-white/70\">{meta['modal_description']}</p>
          <div className=\"mt-5 flex flex-col gap-3 text-sm\">
            <input className=\"w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2\" placeholder={meta['modal_input']} />
          </div>
          <div className=\"mt-6 flex items-center gap-3\">
            <button className=\"rounded-full bg-{meta['accent_button']} px-4 py-2 text-xs font-semibold text-{meta['button_text']}\">{meta['modal_primary']}</button>
            <button className=\"rounded-full border border-white/10 px-4 py-2 text-xs text-white/80\">{meta['modal_secondary']}</button>
          </div>
        </div>
      </div>
    </div>
  );
}}
"""
    )
def build_simple_css(meta: dict) -> str:
    return fmt(
        f"""
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {{
  .simple-card {{
    @apply rounded-2xl border border-white/10 bg-{meta['metric_bg']} p-5;
  }}
}}
"""
    )


def build_simple_readme(meta: dict) -> str:
    return fmt(
        f"""
# {meta['readme_title']}

## Structure
- Header with filters, metric strip, async chart, twin panels, floating action button.
- Use `data-[state=open]` on overlays as needed for this dashboard type.

## Lazy loading
The main analytics widget is wrapped in `React.Suspense` with a pulse fallback.

## Notes
- Metric cards share the `.simple-card` Tailwind component class.
- Buttons inherit accent hover states from the manifest color palette.
"""
    )
health_meta = {
    "component": "Dashboard07",
    "title": "Health telemetry",
    "subtitle": "Hospital network vitals, capacity, and triage signals.",
    "background": "emerald-950",
    "text": "emerald-50",
    "metric_bg": "emerald-900/60",
    "bg_surface": "emerald-900/50",
    "accent_border": "emerald-500",
    "accent_bg": "emerald-500/10",
    "accent_inner": "emerald-900/60",
    "accent_text": "emerald-100",
    "accent_button": "emerald-500",
    "button_text": "emerald-950",
    "button_text_label": "Alert",
    "button_label": "Send triage alert",
    "chart_title": "Vitals trend",
    "table_title": "Critical queues",
    "table_action": "Download",
    "table_headers": ["Unit", "Load", "Wait time"],
    "table_rows": [
        ["ER-West", "82%", "14 min"],
        ["ER-East", "63%", "9 min"],
        ["ICU Central", "91%", "23 min"],
    ],
    "modal_backdrop": "emerald-950/70",
    "modal_surface": "emerald-950/95",
    "modal_title": "Send capacity alert",
    "modal_description": "Notify regional teams about surge handling guidance.",
    "modal_input": "Contact email",
    "modal_primary": "Dispatch",
    "modal_secondary": "Later",
    "panels": [
        {"title": "Bed availability", "subtitle": "12 facilities", "body_bg": "emerald-900/50"},
        {"title": "ICU load", "subtitle": "Capacity vs target", "body_bg": "emerald-900/50"},
    ],
    "readme_title": "Dashboard 07 – Health Telemetry",
}

DASHBOARDS.append(
    {
        "id": "dashboard-07",
        "directory": "dashboard-07-health-telemetry",
        "name": "Health Telemetry",
        "description": "مراقبة المستشفيات من حيث الطاقة الاستيعابية، حالات الطوارئ، والتنبيهات.",
        "grid": {
            "desktop": "Header with filters, 3 metrics, async vitals chart, and dual panels for bed/ICU stats in a 2-column grid.",
            "tablet": "Metric cards go to 2 columns, chart full width, panels stack.",
            "mobile": "All sections stack with sticky alert button, metrics as horizontal scroll." 
        },
        "components": [
            "Filter header",
            "Vitals metrics",
            "Async vitals chart",
            "Bed availability panel",
            "ICU load panel",
            "Floating alert button"
        ],
        "colors": {
            "primary": "#047857",
            "accent": "#34d399",
            "bg": "#022c22",
            "surface": "#064e3b",
            "text": "#ecfdf5"
        },
        "snippets": {
            "layout": "min-h-screen bg-emerald-950 text-emerald-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-emerald-900/60 p-5",
            "chart": "rounded-2xl border border-emerald-500/40 bg-emerald-500/10",
            "table": "rounded-2xl border border-white/10 bg-emerald-900/50",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-emerald-500 px-5 py-3 text-emerald-950"
        },
        "responsive": {
            "desktop": "Metrics in 3 columns, chart + twin panels grid.",
            "tablet": "Metrics wrap 2 per row, chart expands, panels stack with gap.",
            "mobile": "Metrics use horizontal scroll, panels full width with text sizing reduced." 
        },
        "accessibility": [
            "استخدام aria-live=polite لإعلان التنبيهات.",
            "أزرار الفلاتر تدعم focus-visible:ring-emerald-300.",
            "ألوان النقيض تحقق نسبة تفوق 4.5:1." 
        ],
        "interactions": [
            "Hover على الكروت يضيف border-emerald-500/30.",
            "زر التنبيه يحوي تأثير hover:-translate-y-0.5.",
            "Panels يمكن توسيعها مع data-[state=open] لتغيير ارتفاعها." 
        ],
        "performance": [
            "الرسوم الحيوية lazy داخل Suspense.",
            "يمكن استخدام memoization لبطاقات المؤشرات لمنع إعادة التصيير." ,
            "البيانات تتدفق عبر web socket يتم إيقافه عند إخفاء التبويب." 
        ],
        "assets": {
            "jsx": "Dashboard07.jsx",
            "css": "dashboard-07.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(health_meta),
        "css": build_simple_css(health_meta),
        "readme": build_simple_readme(health_meta),
    }
)
learning_meta = {
    "component": "Dashboard08",
    "title": "Learning accelerator",
    "subtitle": "Cohort progress, content performance, and instructor actions.",
    "background": "indigo-950",
    "text": "indigo-50",
    "metric_bg": "indigo-900/60",
    "bg_surface": "indigo-900/40",
    "accent_border": "indigo-500",
    "accent_bg": "indigo-500/10",
    "accent_inner": "indigo-900/70",
    "accent_text": "indigo-100",
    "accent_button": "indigo-500",
    "button_text": "indigo-950",
    "button_text_label": "Assign",
    "button_label": "Assign new cohort",
    "chart_title": "Weekly completion",
    "table_title": "Active cohorts",
    "table_action": "View all",
    "table_headers": ["Cohort", "Learners", "Completion"],
    "table_rows": [
        ["Alpha", "120", "78%"],
        ["Beta", "92", "65%"],
        ["Gamma", "56", "84%"],
    ],
    "modal_backdrop": "indigo-950/70",
    "modal_surface": "indigo-950/95",
    "modal_title": "Invite learners",
    "modal_description": "Send invitations to a selected curriculum path.",
    "modal_input": "Learner email",
    "modal_primary": "Send",
    "modal_secondary": "Cancel",
    "panels": [
        {"title": "Top courses", "subtitle": "By engagement", "body_bg": "indigo-900/50"},
        {"title": "Instructor feedback", "subtitle": "Last 7 days", "body_bg": "indigo-900/50"},
    ],
    "readme_title": "Dashboard 08 – Learning Accelerator",
}

DASHBOARDS.append(
    {
        "id": "dashboard-08",
        "directory": "dashboard-08-learning-accelerator",
        "name": "Learning Accelerator",
        "description": "إدارة مسارات التعليم، تقدم المتعلمين، والتحليلات التفاعلية للمعلمين.",
        "grid": {
            "desktop": "Header with filters, metric row, async completion chart, cohorts table, and dual panels.",
            "tablet": "Metrics wrap into two columns, table and panels stack with spacing.",
            "mobile": "All sections full width with reduced padding; table rows become cards.",
        },
        "components": [
            "Filter header",
            "KPI metrics",
            "Completion chart",
            "Cohorts table",
            "Course highlight panels",
            "Invitation modal",
            "Assign FAB"
        ],
        "colors": {
            "primary": "#4338ca",
            "accent": "#a855f7",
            "bg": "#1e1b4b",
            "surface": "#312e81",
            "text": "#ede9fe"
        },
        "snippets": {
            "layout": "min-h-screen bg-indigo-950 text-indigo-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-indigo-900/60 p-5",
            "chart": "rounded-2xl border border-indigo-500/40 bg-indigo-500/10",
            "table": "rounded-2xl border border-white/10 bg-indigo-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-indigo-500 px-5 py-3 text-indigo-950"
        },
        "responsive": {
            "desktop": "Three metrics inline, chart wide, table padded.",
            "tablet": "Metrics collapse to two columns, table extends full width.",
            "mobile": "Metrics horizontal scroll, panels stack, modal fills screen.",
        },
        "accessibility": [
            "labels مضافة للعناصر التفاعلية باستخدام aria-label.",
            "Focus ring بلون indigo-300 على الأزرار.",
            "استخدام aria-describedby لشرح حالة الإكمال.",
        ],
        "interactions": [
            "بطاقات KPI تتحرك بمقدار translate-y-[-2px] عند hover.",
            "صفوف الجدول تضيء بـ bg-indigo-500/10.",
            "المودال يستخدم data-[state=open] للتحكم بالظهور.",
        ],
        "performance": [
            "مخطط الإكمال lazy داخل Suspense.",
            "تحميل تجميعي لقوائم الطلاب عند فتح المودال فقط.",
            "استخدام memo لقائمة اللوحات لتقليل إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard08.jsx",
            "css": "dashboard-08.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(learning_meta),
        "css": build_simple_css(learning_meta),
        "readme": build_simple_readme(learning_meta),
    }
)
hospitality_meta = {
    "component": "Dashboard09",
    "title": "Hospitality suite",
    "subtitle": "Occupancy, revenue per room, and concierge actions.",
    "background": "amber-950",
    "text": "amber-50",
    "metric_bg": "amber-900/60",
    "bg_surface": "amber-900/40",
    "accent_border": "amber-500",
    "accent_bg": "amber-500/10",
    "accent_inner": "amber-900/60",
    "accent_text": "amber-100",
    "accent_button": "amber-500",
    "button_text": "amber-950",
    "button_text_label": "Upgrade",
    "button_label": "Offer suite upgrade",
    "chart_title": "RevPAR trend",
    "table_title": "Arrivals today",
    "table_action": "Print list",
    "table_headers": ["Guest", "Room", "Check-in"],
    "table_rows": [
        ["Amelia R.", "804", "10:30"],
        ["Sami A.", "512", "11:15"],
        ["Noor M.", "230", "12:00"],
    ],
    "modal_backdrop": "amber-950/70",
    "modal_surface": "amber-950/95",
    "modal_title": "Send upgrade offer",
    "modal_description": "Select guest and send personalized upgrade incentive.",
    "modal_input": "Guest email",
    "modal_primary": "Send offer",
    "modal_secondary": "Skip",
    "panels": [
        {"title": "Housekeeping", "subtitle": "Rooms ready", "body_bg": "amber-900/50"},
        {"title": "Concierge notes", "subtitle": "VIP stays", "body_bg": "amber-900/50"},
    ],
    "readme_title": "Dashboard 09 – Hospitality Suite",
}

DASHBOARDS.append(
    {
        "id": "dashboard-09",
        "directory": "dashboard-09-hospitality-suite",
        "name": "Hospitality Suite",
        "description": "لوحة لمتابعة إشغال الفندق، الإيرادات، وتنظيم الترقيات والخدمات.",
        "grid": {
            "desktop": "Metrics, revenue chart, arrivals table, housekeeping and concierge panels.",
            "tablet": "Metrics in two columns, table full width, panels stack below.",
            "mobile": "Stacked layout with condensed table cards and sticky FAB.",
        },
        "components": [
            "Filter header",
            "Occupancy KPIs",
            "Revenue chart",
            "Arrivals table",
            "Operations panels",
            "Upgrade modal",
            "Offer FAB"
        ],
        "colors": {
            "primary": "#b45309",
            "accent": "#fbbf24",
            "bg": "#451a03",
            "surface": "#78350f",
            "text": "#fef3c7"
        },
        "snippets": {
            "layout": "min-h-screen bg-amber-950 text-amber-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-amber-900/60 p-5",
            "chart": "rounded-2xl border border-amber-500/40 bg-amber-500/10",
            "table": "rounded-2xl border border-white/10 bg-amber-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-amber-500 px-5 py-3 text-amber-950"
        },
        "responsive": {
            "desktop": "Chart and table align, panels share row.",
            "tablet": "Panels drop below table, metrics wrap.",
            "mobile": "Table rows become stacked cards, modal occupies full screen.",
        },
        "accessibility": [
            "تسمية الأزرار aria-label للعمليات الفندقية.",
            "لون التركيز amber-300 للأزرار.",
            "إعلان تغييرات الترقية عبر aria-live=polite.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر زر سريع لبدء الترقيات.",
            "Panels تستخدم group-hover لتظليل البطاقة.",
            "المودال يتدرج scale-95 إلى 100 مع opacity transition.",
        ],
        "performance": [
            "مخطط RevPAR lazy داخل Suspense.",
            "تحميل تفضيلي لقوائم الضيوف عند التمرير.",
            "التحديثات تستخدم web workers لحساب الإشغال.",
        ],
        "assets": {
            "jsx": "Dashboard09.jsx",
            "css": "dashboard-09.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(hospitality_meta),
        "css": build_simple_css(hospitality_meta),
        "readme": build_simple_readme(hospitality_meta),
    }
)
smartcity_meta = {
    "component": "Dashboard10",
    "title": "Smart city ops",
    "subtitle": "Infrastructure sensors, energy usage, and mobility flows.",
    "background": "cyan-950",
    "text": "cyan-50",
    "metric_bg": "cyan-900/60",
    "bg_surface": "cyan-900/40",
    "accent_border": "cyan-500",
    "accent_bg": "cyan-500/10",
    "accent_inner": "cyan-900/60",
    "accent_text": "cyan-100",
    "accent_button": "cyan-500",
    "button_text": "cyan-950",
    "button_text_label": "Dispatch",
    "button_label": "Dispatch field team",
    "chart_title": "Traffic density",
    "table_title": "Active incidents",
    "table_action": "Export",
    "table_headers": ["Zone", "Type", "Status"],
    "table_rows": [
        ["North", "Signal outage", "Responding"],
        ["Harbor", "Flood sensor", "Monitoring"],
        ["Central", "Air quality", "Escalated"],
    ],
    "modal_backdrop": "cyan-950/70",
    "modal_surface": "cyan-950/95",
    "modal_title": "Log maintenance task",
    "modal_description": "Create a ticket for field technicians with ETA.",
    "modal_input": "Task summary",
    "modal_primary": "Create",
    "modal_secondary": "Close",
    "panels": [
        {"title": "Energy load", "subtitle": "Grid demand", "body_bg": "cyan-900/50"},
        {"title": "Transit status", "subtitle": "Lines on time", "body_bg": "cyan-900/50"},
    ],
    "readme_title": "Dashboard 10 – Smart City Ops",
}

DASHBOARDS.append(
    {
        "id": "dashboard-10",
        "directory": "dashboard-10-smart-city-ops",
        "name": "Smart City Ops",
        "description": "منصة لمراقبة البنية التحتية للمدينة الذكية، الحوادث، وحركة المرور.",
        "grid": {
            "desktop": "Metrics, async traffic chart, incident table, energy and transit panels.",
            "tablet": "Metrics wrap, table fills width, panels stack.",
            "mobile": "Stacked layout with condensed incident cards and sticky dispatch FAB.",
        },
        "components": [
            "Filter header",
            "Sensor KPIs",
            "Traffic chart",
            "Incident table",
            "Energy & transit panels",
            "Maintenance modal",
            "Dispatch FAB"
        ],
        "colors": {
            "primary": "#0e7490",
            "accent": "#06b6d4",
            "bg": "#083344",
            "surface": "#134e4a",
            "text": "#ecfeff"
        },
        "snippets": {
            "layout": "min-h-screen bg-cyan-950 text-cyan-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-cyan-900/60 p-5",
            "chart": "rounded-2xl border border-cyan-500/40 bg-cyan-500/10",
            "table": "rounded-2xl border border-white/10 bg-cyan-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-cyan-500 px-5 py-3 text-cyan-950"
        },
        "responsive": {
            "desktop": "Chart uses wide span, incidents table adjacent.",
            "tablet": "Panels move below table, metrics wrap 2 per row.",
            "mobile": "Incident rows become cards with badges, modal full screen.",
        },
        "accessibility": [
            "استخدام aria-live للإشعارات الجديدة.",
            "تمييز المخططات بألوان عالية التباين.",
            "التحكم بلوحة المفاتيح في زر الإرسال.",
        ],
        "interactions": [
            "Hover على الحوادث يظهر actions inline.",
            "Panels تستخدم transition-colors للتمييز.",
            "المودال يفتح مع data-[state=open] يزيل translate-y-4.",
        ],
        "performance": [
            "مخطط المرور lazy داخل Suspense.",
            "تجميع تحديثات المستشعرات باستخدام requestAnimationFrame.",
            "تحزيم كسول لوحدة الحوادث عند الطلب.",
        ],
        "assets": {
            "jsx": "Dashboard10.jsx",
            "css": "dashboard-10.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(smartcity_meta),
        "css": build_simple_css(smartcity_meta),
        "readme": build_simple_readme(smartcity_meta),
    }
)
retail_meta = {
    "component": "Dashboard11",
    "title": "Retail insight",
    "subtitle": "Store revenue, product mix, and inventory signals.",
    "background": "orange-950",
    "text": "orange-50",
    "metric_bg": "orange-900/60",
    "bg_surface": "orange-900/40",
    "accent_border": "orange-500",
    "accent_bg": "orange-500/10",
    "accent_inner": "orange-900/60",
    "accent_text": "orange-100",
    "accent_button": "orange-500",
    "button_text": "orange-950",
    "button_text_label": "Promo",
    "button_label": "Launch promotion",
    "chart_title": "Daily revenue",
    "table_title": "Top stores",
    "table_action": "Compare",
    "table_headers": ["Store", "Sales", "YoY"],
    "table_rows": [
        ["Dubai Mall", "$420k", "+12%"],
        ["Doha Center", "$305k", "+8%"],
        ["Riyadh Plaza", "$280k", "+10%"],
    ],
    "modal_backdrop": "orange-950/70",
    "modal_surface": "orange-950/95",
    "modal_title": "Schedule promo",
    "modal_description": "Configure limited-time offer across selected stores.",
    "modal_input": "Campaign name",
    "modal_primary": "Schedule",
    "modal_secondary": "Later",
    "panels": [
        {"title": "Product mix", "subtitle": "By category", "body_bg": "orange-900/50"},
        {"title": "Inventory alerts", "subtitle": "Low stock", "body_bg": "orange-900/50"},
    ],
    "readme_title": "Dashboard 11 – Retail Insight",
}

DASHBOARDS.append(
    {
        "id": "dashboard-11",
        "directory": "dashboard-11-retail-insight",
        "name": "Retail Insight",
        "description": "لوحة لسلاسل التجزئة تركز على المبيعات، المزج السلعي، والتنبيهات المخزنية.",
        "grid": {
            "desktop": "Metrics row, revenue chart, top stores table, product mix and inventory panels.",
            "tablet": "Metrics wrap, panels stack below table.",
            "mobile": "Stacked layout, table becomes cards, FAB pinned.",
        },
        "components": [
            "Filter header",
            "Revenue KPIs",
            "Revenue chart",
            "Top store table",
            "Mix & inventory panels",
            "Promotion modal",
            "Promo FAB"
        ],
        "colors": {
            "primary": "#ea580c",
            "accent": "#fb923c",
            "bg": "#431407",
            "surface": "#7c2d12",
            "text": "#ffedd5"
        },
        "snippets": {
            "layout": "min-h-screen bg-orange-950 text-orange-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-orange-900/60 p-5",
            "chart": "rounded-2xl border border-orange-500/40 bg-orange-500/10",
            "table": "rounded-2xl border border-white/10 bg-orange-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-orange-500 px-5 py-3 text-orange-950"
        },
        "responsive": {
            "desktop": "Chart spans wide area with table next, panels below.",
            "tablet": "Panels drop under table, metrics wrap two per row.",
            "mobile": "Table becomes card list, modal full screen.",
        },
        "accessibility": [
            "إضافة aria-sort للجدول حسب الأعمدة.",
            "أزرار الفلتر تدعم focus-visible:ring-orange-300.",
            "التباين ≥ 4.5:1 لكل النصوص.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر نسبة النمو.",
            "Panels تتحرك scale-105 عند التركيز.",
            "المودال يستخدم data-[state=open] للظهور.",
        ],
        "performance": [
            "مخطط المبيعات lazy.",
            "تقسيم بيانات المتاجر حسب pagination ديناميكي.",
            "Caching للوحة المزج السلعي باستخدام memo.",
        ],
        "assets": {
            "jsx": "Dashboard11.jsx",
            "css": "dashboard-11.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(retail_meta),
        "css": build_simple_css(retail_meta),
        "readme": build_simple_readme(retail_meta),
    }
)
customer_meta = {
    "component": "Dashboard12",
    "title": "Customer 360",
    "subtitle": "Pipeline health, retention cohorts, and touchpoints.",
    "background": "sky-950",
    "text": "sky-50",
    "metric_bg": "sky-900/60",
    "bg_surface": "sky-900/40",
    "accent_border": "sky-500",
    "accent_bg": "sky-500/10",
    "accent_inner": "sky-900/60",
    "accent_text": "sky-100",
    "accent_button": "sky-500",
    "button_text": "sky-950",
    "button_text_label": "Note",
    "button_label": "Add account note",
    "chart_title": "Pipeline velocity",
    "table_title": "Open opportunities",
    "table_action": "Sort",
    "table_headers": ["Account", "Stage", "Value"],
    "table_rows": [
        ["Nova Tech", "Proposal", "$180k"],
        ["Blue Labs", "Negotiation", "$95k"],
        ["Orbit", "Discovery", "$65k"],
    ],
    "modal_backdrop": "sky-950/70",
    "modal_surface": "sky-950/95",
    "modal_title": "Log touchpoint",
    "modal_description": "Capture meeting recap and next steps for the account.",
    "modal_input": "Touchpoint summary",
    "modal_primary": "Save",
    "modal_secondary": "Dismiss",
    "panels": [
        {"title": "Retention cohorts", "subtitle": "By quarter", "body_bg": "sky-900/50"},
        {"title": "Upcoming meetings", "subtitle": "Next 3 days", "body_bg": "sky-900/50"},
    ],
    "readme_title": "Dashboard 12 – Customer 360",
}

DASHBOARDS.append(
    {
        "id": "dashboard-12",
        "directory": "dashboard-12-customer-360",
        "name": "Customer 360",
        "description": "لوحة CRM لمراقبة الصفقات، الاحتفاظ، ومهام فرق النجاح.",
        "grid": {
            "desktop": "Metrics row, velocity chart, opportunities table, retention and meetings panels.",
            "tablet": "Metrics wrap, table expands, panels stack.",
            "mobile": "Stack layout with condensed table cards and sticky note FAB.",
        },
        "components": [
            "Filter header",
            "Pipeline KPIs",
            "Velocity chart",
            "Opportunities table",
            "Retention & meetings panels",
            "Touchpoint modal",
            "Note FAB"
        ],
        "colors": {
            "primary": "#0284c7",
            "accent": "#38bdf8",
            "bg": "#082f49",
            "surface": "#0f4c75",
            "text": "#e0f2fe"
        },
        "snippets": {
            "layout": "min-h-screen bg-sky-950 text-sky-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-sky-900/60 p-5",
            "chart": "rounded-2xl border border-sky-500/40 bg-sky-500/10",
            "table": "rounded-2xl border border-white/10 bg-sky-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-sky-500 px-5 py-3 text-sky-950"
        },
        "responsive": {
            "desktop": "Chart and table share row, panels below.",
            "tablet": "Panels drop under table, metrics wrap two per row.",
            "mobile": "Table cards and modal full screen.",
        },
        "accessibility": [
            "aria-pressed للأزرار المتبدلة بين المراحل.",
            "Focus-visible ring sky-300.",
            "القراءة الآلية لحالة الصفقات عبر aria-live.",
        ],
        "interactions": [
            "Hover على الصفقات يظهر CTA سريع.",
            "Panels تستخدم transition-opacity.",
            "المودال يفتح مع data-[state=open] للتدرج.",
        ],
        "performance": [
            "مخطط السرعة lazy.",
            "تقسيم بيانات الصفقات باستخدام virtual list.",
            "Memo لبطاقات الاجتماعات لتقليل إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard12.jsx",
            "css": "dashboard-12.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(customer_meta),
        "css": build_simple_css(customer_meta),
        "readme": build_simple_readme(customer_meta),
    }
)
finance_meta = {
    "component": "Dashboard13",
    "title": "Finance command",
    "subtitle": "Cashflow, expenses, and forecast variance.",
    "background": "slate-950",
    "text": "slate-50",
    "metric_bg": "slate-900/60",
    "bg_surface": "slate-900/40",
    "accent_border": "emerald-400",
    "accent_bg": "emerald-400/10",
    "accent_inner": "slate-900/60",
    "accent_text": "emerald-100",
    "accent_button": "emerald-400",
    "button_text": "slate-950",
    "button_text_label": "Report",
    "button_label": "Share finance report",
    "chart_title": "Cashflow trend",
    "table_title": "Expense highlights",
    "table_action": "Audit",
    "table_headers": ["Category", "Spend", "Variance"],
    "table_rows": [
        ["Payroll", "$520k", "+2%"],
        ["Vendors", "$180k", "-1%"],
        ["Cloud", "$98k", "+5%"],
    ],
    "modal_backdrop": "slate-950/70",
    "modal_surface": "slate-950/95",
    "modal_title": "Approve expense",
    "modal_description": "Confirm or reject the selected expense line.",
    "modal_input": "Approval note",
    "modal_primary": "Approve",
    "modal_secondary": "Reject",
    "panels": [
        {"title": "Forecast", "subtitle": "Next quarter", "body_bg": "slate-900/50"},
        {"title": "Savings", "subtitle": "Opportunities", "body_bg": "slate-900/50"},
    ],
    "readme_title": "Dashboard 13 – Finance Command",
}

DASHBOARDS.append(
    {
        "id": "dashboard-13",
        "directory": "dashboard-13-finance-command",
        "name": "Finance Command",
        "description": "لوحة مالية لمتابعة التدفقات النقدية، المصاريف، وتوقعات الأداء.",
        "grid": {
            "desktop": "Metrics row, cashflow chart, expense table, forecast and savings panels.",
            "tablet": "Metrics wrap, panels stack under table.",
            "mobile": "Stacked layout with condensed table and modal full screen.",
        },
        "components": [
            "Filter header",
            "Cashflow KPIs",
            "Cashflow chart",
            "Expense table",
            "Forecast panels",
            "Approval modal",
            "Report FAB"
        ],
        "colors": {
            "primary": "#0f172a",
            "accent": "#34d399",
            "bg": "#020617",
            "surface": "#1e293b",
            "text": "#e2e8f0"
        },
        "snippets": {
            "layout": "min-h-screen bg-slate-950 text-slate-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-slate-900/60 p-5",
            "chart": "rounded-2xl border border-emerald-400/40 bg-emerald-400/10",
            "table": "rounded-2xl border border-white/10 bg-slate-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-emerald-400 px-5 py-3 text-slate-950"
        },
        "responsive": {
            "desktop": "Chart and table align with panels below.",
            "tablet": "Panels drop under table, metrics wrap.",
            "mobile": "Cards stacked, modal fills view.",
        },
        "accessibility": [
            "إضافة aria-labelledby للمودال.",
            "إعلان قرارات الموافقة عبر aria-live.",
            "استخدام focus-visible:ring-emerald-300 للأزرار.",
        ],
        "interactions": [
            "Hover على صفوف المصروفات يظهر زر الموافقة.",
            "Panels تتدرج opacity عند المرور.",
            "المودال يستخدم data-[state=open] للتحكم بالتحريك.",
        ],
        "performance": [
            "مخطط التدفق lazy.",
            "إحصاءات التوقعات تحسب باستخدام worker عند الطلب.",
            "Memo للبطاقات لتقليل إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard13.jsx",
            "css": "dashboard-13.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(finance_meta),
        "css": build_simple_css(finance_meta),
        "readme": build_simple_readme(finance_meta),
    }
)
support_meta = {
    "component": "Dashboard14",
    "title": "Support ops",
    "subtitle": "Ticket queues, SLA adherence, and agent workload.",
    "background": "violet-950",
    "text": "violet-50",
    "metric_bg": "violet-900/60",
    "bg_surface": "violet-900/40",
    "accent_border": "violet-500",
    "accent_bg": "violet-500/10",
    "accent_inner": "violet-900/60",
    "accent_text": "violet-100",
    "accent_button": "violet-500",
    "button_text": "violet-950",
    "button_text_label": "Escalate",
    "button_label": "Escalate priority ticket",
    "chart_title": "Resolution time",
    "table_title": "Active tickets",
    "table_action": "Filter",
    "table_headers": ["Ticket", "Queue", "SLA"],
    "table_rows": [
        ["#3920", "Billing", "2h"],
        ["#3914", "Technical", "1h"],
        ["#3908", "Onboarding", "3h"],
    ],
    "modal_backdrop": "violet-950/70",
    "modal_surface": "violet-950/95",
    "modal_title": "Escalate ticket",
    "modal_description": "Notify tier-2 team with full context and logs.",
    "modal_input": "Escalation reason",
    "modal_primary": "Escalate",
    "modal_secondary": "Cancel",
    "panels": [
        {"title": "SLA adherence", "subtitle": "Last 24h", "body_bg": "violet-900/50"},
        {"title": "Agent load", "subtitle": "Per shift", "body_bg": "violet-900/50"},
    ],
    "readme_title": "Dashboard 14 – Support Ops",
}

DASHBOARDS.append(
    {
        "id": "dashboard-14",
        "directory": "dashboard-14-support-ops",
        "name": "Support Ops",
        "description": "لوحة دعم العملاء لقياس أحجام التذاكر، الالتزام بالاتفاقيات، وأعباء الفرق.",
        "grid": {
            "desktop": "Metrics row, resolution chart, tickets table, SLA and agent load panels.",
            "tablet": "Metrics wrap, table full width, panels stack.",
            "mobile": "Stack layout with card-style tickets and sticky FAB.",
        },
        "components": [
            "Filter header",
            "Support KPIs",
            "Resolution chart",
            "Ticket table",
            "SLA panels",
            "Escalation modal",
            "Escalate FAB"
        ],
        "colors": {
            "primary": "#6d28d9",
            "accent": "#a855f7",
            "bg": "#2e1065",
            "surface": "#4c1d95",
            "text": "#ede9fe"
        },
        "snippets": {
            "layout": "min-h-screen bg-violet-950 text-violet-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-violet-900/60 p-5",
            "chart": "rounded-2xl border border-violet-500/40 bg-violet-500/10",
            "table": "rounded-2xl border border-white/10 bg-violet-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-violet-500 px-5 py-3 text-violet-950"
        },
        "responsive": {
            "desktop": "Chart + table align, panels below.",
            "tablet": "Panels move under table, metrics wrap two per row.",
            "mobile": "Tickets convert to cards, modal full screen.",
        },
        "accessibility": [
            "الجدول يدعم aria-live لتغييرات SLA.",
            "Focus-visible ring violet-300.",
            "استخدام aria-expanded لأزرار التصفية.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر زر التصعيد.",
            "Panels تستخدم transition-scale.",
            "المودال ينتقل باستخدام data-[state=open] مع opacity.",
        ],
        "performance": [
            "مخطط الوقت lazy.",
            "تجزئة بيانات التذاكر حسب الصفحة.",
            "Memo لبطاقات SLA لتقليل إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard14.jsx",
            "css": "dashboard-14.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(support_meta),
        "css": build_simple_css(support_meta),
        "readme": build_simple_readme(support_meta),
    }
)
manufacturing_meta = {
    "component": "Dashboard15",
    "title": "Manufacturing flow",
    "subtitle": "Production lines, throughput, and maintenance windows.",
    "background": "stone-950",
    "text": "stone-50",
    "metric_bg": "stone-900/60",
    "bg_surface": "stone-900/40",
    "accent_border": "amber-400",
    "accent_bg": "amber-400/10",
    "accent_inner": "stone-900/60",
    "accent_text": "amber-100",
    "accent_button": "amber-400",
    "button_text": "stone-950",
    "button_text_label": "Schedule",
    "button_label": "Schedule maintenance",
    "chart_title": "Throughput",
    "table_title": "Line status",
    "table_action": "Details",
    "table_headers": ["Line", "Output", "Status"],
    "table_rows": [
        ["Line A", "1,200 units", "Running"],
        ["Line B", "980 units", "Setup"],
        ["Line C", "0", "Maintenance"],
    ],
    "modal_backdrop": "stone-950/70",
    "modal_surface": "stone-950/95",
    "modal_title": "Plan downtime",
    "modal_description": "Select line and window for preventive maintenance.",
    "modal_input": "Maintenance note",
    "modal_primary": "Schedule",
    "modal_secondary": "Cancel",
    "panels": [
        {"title": "Quality score", "subtitle": "Last 8h", "body_bg": "stone-900/50"},
        {"title": "Material supply", "subtitle": "Critical items", "body_bg": "stone-900/50"},
    ],
    "readme_title": "Dashboard 15 – Manufacturing Flow",
}

DASHBOARDS.append(
    {
        "id": "dashboard-15",
        "directory": "dashboard-15-manufacturing-flow",
        "name": "Manufacturing Flow",
        "description": "لوحة تشغيل للمصانع لمتابعة خطوط الإنتاج، الجودة، وصيانة المعدات.",
        "grid": {
            "desktop": "Metrics row, throughput chart, line status table, quality and supply panels.",
            "tablet": "Metrics wrap, panels stack under table.",
            "mobile": "Stacked layout, table as cards, modal full screen.",
        },
        "components": [
            "Filter header",
            "Production KPIs",
            "Throughput chart",
            "Line status table",
            "Quality & supply panels",
            "Maintenance modal",
            "Schedule FAB"
        ],
        "colors": {
            "primary": "#292524",
            "accent": "#f59e0b",
            "bg": "#0c0a09",
            "surface": "#1c1917",
            "text": "#f5f5f4"
        },
        "snippets": {
            "layout": "min-h-screen bg-stone-950 text-stone-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-stone-900/60 p-5",
            "chart": "rounded-2xl border border-amber-400/40 bg-amber-400/10",
            "table": "rounded-2xl border border-white/10 bg-stone-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-amber-400 px-5 py-3 text-stone-950"
        },
        "responsive": {
            "desktop": "Chart and table align, panels below.",
            "tablet": "Panels drop, metrics wrap two per row.",
            "mobile": "Cards stacked, modal fills screen.",
        },
        "accessibility": [
            "استخدام aria-current للخط المحدد.",
            "Focus ring amber-300.",
            "تنبيهات الجدول تعلن عبر aria-live.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر مؤشر حالة.",
            "Panels تستخدم transition-border.",
            "المودال يعتمد data-[state=open] للحركة.",
        ],
        "performance": [
            "مخطط الإنتاج lazy.",
            "Virtualization لصفوف الخطوط عند العدد الكبير.",
            "Memo لبطاقات الجودة.",
        ],
        "assets": {
            "jsx": "Dashboard15.jsx",
            "css": "dashboard-15.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(manufacturing_meta),
        "css": build_simple_css(manufacturing_meta),
        "readme": build_simple_readme(manufacturing_meta),
    }
)
energy_meta = {
    "component": "Dashboard16",
    "title": "Energy grid",
    "subtitle": "Generation mix, load balance, and outage alerts.",
    "background": "emerald-950",
    "text": "emerald-50",
    "metric_bg": "emerald-900/60",
    "bg_surface": "emerald-900/40",
    "accent_border": "lime-400",
    "accent_bg": "lime-400/10",
    "accent_inner": "emerald-900/60",
    "accent_text": "lime-100",
    "accent_button": "lime-400",
    "button_text": "emerald-950",
    "button_text_label": "Balance",
    "button_label": "Rebalance grid",
    "chart_title": "Load vs supply",
    "table_title": "Grid events",
    "table_action": "Acknowledge",
    "table_headers": ["Event", "Region", "Status"],
    "table_rows": [
        ["Line overload", "North", "Investigating"],
        ["Wind spike", "Coastal", "Balancing"],
        ["Battery dispatch", "Central", "Active"],
    ],
    "modal_backdrop": "emerald-950/70",
    "modal_surface": "emerald-950/95",
    "modal_title": "Balance instruction",
    "modal_description": "Issue command to adjust generation assets.",
    "modal_input": "Dispatch details",
    "modal_primary": "Dispatch",
    "modal_secondary": "Cancel",
    "panels": [
        {"title": "Generation mix", "subtitle": "Real-time", "body_bg": "emerald-900/50"},
        {"title": "Storage levels", "subtitle": "Battery sites", "body_bg": "emerald-900/50"},
    ],
    "readme_title": "Dashboard 16 – Energy Grid",
}

DASHBOARDS.append(
    {
        "id": "dashboard-16",
        "directory": "dashboard-16-energy-grid",
        "name": "Energy Grid",
        "description": "لوحة للطاقة الكهربائية تراقب أحمال الشبكة، المزج التوليدي، وتنبيهات الانقطاع.",
        "grid": {
            "desktop": "Metrics row, load chart, events table, generation and storage panels.",
            "tablet": "Metrics wrap, panels under table.",
            "mobile": "Stacked layout, cards for events, modal full screen.",
        },
        "components": [
            "Filter header",
            "Grid KPIs",
            "Load chart",
            "Events table",
            "Generation panels",
            "Dispatch modal",
            "Balance FAB"
        ],
        "colors": {
            "primary": "#065f46",
            "accent": "#84cc16",
            "bg": "#022c22",
            "surface": "#064e3b",
            "text": "#ecfdf5"
        },
        "snippets": {
            "layout": "min-h-screen bg-emerald-950 text-emerald-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-emerald-900/60 p-5",
            "chart": "rounded-2xl border border-lime-400/40 bg-lime-400/10",
            "table": "rounded-2xl border border-white/10 bg-emerald-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-lime-400 px-5 py-3 text-emerald-950"
        },
        "responsive": {
            "desktop": "Chart + table align, panels below.",
            "tablet": "Panels drop, metrics wrap.",
            "mobile": "Events as cards, modal full height.",
        },
        "accessibility": [
            "التباين ≥ 4.5:1.",
            "aria-live للأحداث الجديدة.",
            "Focus-visible ring lime-200.",
        ],
        "interactions": [
            "Hover على الأحداث يظهر تفاصيل إضافية.",
            "Panels تستخدم transition-scale.",
            "المودال يعتمد data-[state=open] للتحكم بالحركة.",
        ],
        "performance": [
            "مخطط الحمل lazy.",
            "تخزين بيانات الأحداث محليًا وإعادة استخدام الكاش.",
            "Memo للبطاقات للتقليل من إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard16.jsx",
            "css": "dashboard-16.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(energy_meta),
        "css": build_simple_css(energy_meta),
        "readme": build_simple_readme(energy_meta),
    }
)
logistics_meta = {
    "component": "Dashboard17",
    "title": "Logistics tracker",
    "subtitle": "Fleet locations, delivery ETAs, and exception alerts.",
    "background": "blue-950",
    "text": "blue-50",
    "metric_bg": "blue-900/60",
    "bg_surface": "blue-900/40",
    "accent_border": "sky-400",
    "accent_bg": "sky-400/10",
    "accent_inner": "blue-900/60",
    "accent_text": "sky-100",
    "accent_button": "sky-400",
    "button_text": "blue-950",
    "button_text_label": "Assign",
    "button_label": "Assign reroute",
    "chart_title": "On-time deliveries",
    "table_title": "In-transit shipments",
    "table_action": "Track",
    "table_headers": ["Shipment", "Route", "ETA"],
    "table_rows": [
        ["ORD-8831", "DXB → JED", "2h"],
        ["ORD-8822", "RUH → DOH", "5h"],
        ["ORD-8814", "DXB → CAI", "8h"],
    ],
    "modal_backdrop": "blue-950/70",
    "modal_surface": "blue-950/95",
    "modal_title": "Reroute shipment",
    "modal_description": "Update driver instructions and notify recipient.",
    "modal_input": "New route notes",
    "modal_primary": "Update",
    "modal_secondary": "Cancel",
    "panels": [
        {"title": "Fleet overview", "subtitle": "Vehicles active", "body_bg": "blue-900/50"},
        {"title": "Exception feed", "subtitle": "Requires attention", "body_bg": "blue-900/50"},
    ],
    "readme_title": "Dashboard 17 – Logistics Tracker",
}

DASHBOARDS.append(
    {
        "id": "dashboard-17",
        "directory": "dashboard-17-logistics-tracker",
        "name": "Logistics Tracker",
        "description": "لوحة لوجستية لمتابعة الشحنات، السائقين، وتنبيهات الاستثناءات.",
        "grid": {
            "desktop": "Metrics row, delivery chart, shipments table, fleet and exceptions panels.",
            "tablet": "Metrics wrap, panels stack under table.",
            "mobile": "Stacked layout with shipment cards and sticky FAB.",
        },
        "components": [
            "Filter header",
            "Delivery KPIs",
            "On-time chart",
            "Shipment table",
            "Fleet panels",
            "Reroute modal",
            "Assign FAB"
        ],
        "colors": {
            "primary": "#1d4ed8",
            "accent": "#38bdf8",
            "bg": "#0f172a",
            "surface": "#1e3a8a",
            "text": "#dbeafe"
        },
        "snippets": {
            "layout": "min-h-screen bg-blue-950 text-blue-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-blue-900/60 p-5",
            "chart": "rounded-2xl border border-sky-400/40 bg-sky-400/10",
            "table": "rounded-2xl border border-white/10 bg-blue-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-sky-400 px-5 py-3 text-blue-950"
        },
        "responsive": {
            "desktop": "Chart + table align, panels below.",
            "tablet": "Panels drop, metrics wrap.",
            "mobile": "Shipments as cards, modal full screen.",
        },
        "accessibility": [
            "إضافة aria-describedby لعرض المعلومات التفصيلية للشحنة.",
            "Focus ring sky-300.",
            "aria-live لتحديثات الاستثناءات.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر زر التتبع.",
            "Panels تستخدم transition-translate.",
            "المودال يعتمد data-[state=open] لتغيير الحجم.",
        ],
        "performance": [
            "مخطط التسليم lazy.",
            "Virtualization للشحنات الطويلة.",
            "Memo لبطاقات الأسطول.",
        ],
        "assets": {
            "jsx": "Dashboard17.jsx",
            "css": "dashboard-17.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(logistics_meta),
        "css": build_simple_css(logistics_meta),
        "readme": build_simple_readme(logistics_meta),
    }
)
people_meta = {
    "component": "Dashboard18",
    "title": "People ops",
    "subtitle": "Headcount, hiring funnel, and engagement signals.",
    "background": "rose-950",
    "text": "rose-50",
    "metric_bg": "rose-900/60",
    "bg_surface": "rose-900/40",
    "accent_border": "rose-400",
    "accent_bg": "rose-400/10",
    "accent_inner": "rose-900/60",
    "accent_text": "rose-100",
    "accent_button": "rose-400",
    "button_text": "rose-950",
    "button_text_label": "Invite",
    "button_label": "Invite candidate",
    "chart_title": "Hiring pipeline",
    "table_title": "Open roles",
    "table_action": "View",
    "table_headers": ["Role", "Stage", "Candidates"],
    "table_rows": [
        ["Product Manager", "Final", "3"],
        ["Backend Engineer", "Onsite", "5"],
        ["Designer", "Screen", "8"],
    ],
    "modal_backdrop": "rose-950/70",
    "modal_surface": "rose-950/95",
    "modal_title": "Send invitation",
    "modal_description": "Share interview schedule and preparation resources.",
    "modal_input": "Candidate email",
    "modal_primary": "Send",
    "modal_secondary": "Later",
    "panels": [
        {"title": "Engagement score", "subtitle": "Pulse survey", "body_bg": "rose-900/50"},
        {"title": "Upcoming reviews", "subtitle": "This month", "body_bg": "rose-900/50"},
    ],
    "readme_title": "Dashboard 18 – People Ops",
}

DASHBOARDS.append(
    {
        "id": "dashboard-18",
        "directory": "dashboard-18-people-ops",
        "name": "People Ops",
        "description": "لوحة الموارد البشرية لعرض التوظيف، رضا الموظفين، والمراجعات القادمة.",
        "grid": {
            "desktop": "Metrics row, pipeline chart, open roles table, engagement and review panels.",
            "tablet": "Metrics wrap, panels stack under table.",
            "mobile": "Stacked layout, table cards, modal full screen.",
        },
        "components": [
            "Filter header",
            "People KPIs",
            "Pipeline chart",
            "Roles table",
            "Engagement panels",
            "Invitation modal",
            "Invite FAB"
        ],
        "colors": {
            "primary": "#be123c",
            "accent": "#fb7185",
            "bg": "#4c0519",
            "surface": "#7f1d1d",
            "text": "#ffe4e6"
        },
        "snippets": {
            "layout": "min-h-screen bg-rose-950 text-rose-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-rose-900/60 p-5",
            "chart": "rounded-2xl border border-rose-400/40 bg-rose-400/10",
            "table": "rounded-2xl border border-white/10 bg-rose-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-rose-400 px-5 py-3 text-rose-950"
        },
        "responsive": {
            "desktop": "Chart + table align, panels below.",
            "tablet": "Panels drop, metrics wrap.",
            "mobile": "Roles as cards, modal full height.",
        },
        "accessibility": [
            "aria-describedby للملاحظات على الأدوار.",
            "Focus ring rose-300.",
            "aria-live لتغييرات عدد المرشحين.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر زر الدعوة.",
            "Panels تستخدم transition-opacity.",
            "المودال يعتمد data-[state=open] لتغيير الحجم.",
        ],
        "performance": [
            "مخطط التوظيف lazy.",
            "تخزين بيانات المرشحين في cache محلي.",
            "Memo للبطاقات لتقليل إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard18.jsx",
            "css": "dashboard-18.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(people_meta),
        "css": build_simple_css(people_meta),
        "readme": build_simple_readme(people_meta),
    }
)
content_meta = {
    "component": "Dashboard19",
    "title": "Content studio",
    "subtitle": "Editorial calendar, asset pipeline, and performance.",
    "background": "purple-950",
    "text": "purple-50",
    "metric_bg": "purple-900/60",
    "bg_surface": "purple-900/40",
    "accent_border": "fuchsia-400",
    "accent_bg": "fuchsia-400/10",
    "accent_inner": "purple-900/60",
    "accent_text": "fuchsia-100",
    "accent_button": "fuchsia-400",
    "button_text": "purple-950",
    "button_text_label": "Publish",
    "button_label": "Publish story",
    "chart_title": "Reach growth",
    "table_title": "Production queue",
    "table_action": "Reorder",
    "table_headers": ["Story", "Stage", "Owner"],
    "table_rows": [
        ["AI trends", "Editing", "Sara"],
        ["Product launch", "Review", "Khalid"],
        ["Customer story", "Draft", "Mona"],
    ],
    "modal_backdrop": "purple-950/70",
    "modal_surface": "purple-950/95",
    "modal_title": "Schedule publish",
    "modal_description": "Set publish time and platforms for the story.",
    "modal_input": "Publish date",
    "modal_primary": "Schedule",
    "modal_secondary": "Save draft",
    "panels": [
        {"title": "Calendar", "subtitle": "Next releases", "body_bg": "purple-900/50"},
        {"title": "Asset approvals", "subtitle": "Pending", "body_bg": "purple-900/50"},
    ],
    "readme_title": "Dashboard 19 – Content Studio",
}

DASHBOARDS.append(
    {
        "id": "dashboard-19",
        "directory": "dashboard-19-content-studio",
        "name": "Content Studio",
        "description": "لوحة فريق المحتوى لإدارة الإنتاج، النشر، وأداء القصص.",
        "grid": {
            "desktop": "Metrics row, reach chart, production table, calendar and approvals panels.",
            "tablet": "Metrics wrap, panels stack under table.",
            "mobile": "Stacked layout, table cards, modal full screen.",
        },
        "components": [
            "Filter header",
            "Content KPIs",
            "Reach chart",
            "Production table",
            "Calendar panels",
            "Schedule modal",
            "Publish FAB"
        ],
        "colors": {
            "primary": "#6d28d9",
            "accent": "#d946ef",
            "bg": "#2e1065",
            "surface": "#581c87",
            "text": "#f5e1ff"
        },
        "snippets": {
            "layout": "min-h-screen bg-purple-950 text-purple-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-purple-900/60 p-5",
            "chart": "rounded-2xl border border-fuchsia-400/40 bg-fuchsia-400/10",
            "table": "rounded-2xl border border-white/10 bg-purple-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-fuchsia-400 px-5 py-3 text-purple-950"
        },
        "responsive": {
            "desktop": "Chart + table align, panels below.",
            "tablet": "Panels drop, metrics wrap.",
            "mobile": "Production queue as cards, modal fills view.",
        },
        "accessibility": [
            "aria-describedby للأدوار في الطابور.",
            "Focus ring fuchsia-300.",
            "aria-live لتغييرات الجدول الزمني.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر زر النشر.",
            "Panels تستخدم transition-opacity.",
            "المودال يعتمد data-[state=open] للتدرج.",
        ],
        "performance": [
            "مخطط الوصول lazy.",
            "تقسيم بيانات الطابور عبر pagination.",
            "Memo للبطاقات لتقليل إعادة التصيير.",
        ],
        "assets": {
            "jsx": "Dashboard19.jsx",
            "css": "dashboard-19.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(content_meta),
        "css": build_simple_css(content_meta),
        "readme": build_simple_readme(content_meta),
    }
)
launch_meta = {
    "component": "Dashboard20",
    "title": "Product launch",
    "subtitle": "Milestones, go-to-market readiness, and risk tracking.",
    "background": "indigo-950",
    "text": "indigo-50",
    "metric_bg": "indigo-900/60",
    "bg_surface": "indigo-900/40",
    "accent_border": "amber-400",
    "accent_bg": "amber-400/10",
    "accent_inner": "indigo-900/60",
    "accent_text": "amber-100",
    "accent_button": "amber-400",
    "button_text": "indigo-950",
    "button_text_label": "Launch",
    "button_label": "Trigger launch",
    "chart_title": "Readiness score",
    "table_title": "Launch milestones",
    "table_action": "Update",
    "table_headers": ["Milestone", "Owner", "Status"],
    "table_rows": [
        ["Beta feedback", "Aisha", "Complete"],
        ["Pricing final", "Rami", "In review"],
        ["Docs ready", "Lina", "Pending"],
    ],
    "modal_backdrop": "indigo-950/70",
    "modal_surface": "indigo-950/95",
    "modal_title": "Risk update",
    "modal_description": "Capture mitigation plan for identified launch risk.",
    "modal_input": "Risk summary",
    "modal_primary": "Log",
    "modal_secondary": "Dismiss",
    "panels": [
        {"title": "Go-to-market", "subtitle": "Assets ready", "body_bg": "indigo-900/50"},
        {"title": "Dependencies", "subtitle": "Cross-team", "body_bg": "indigo-900/50"},
    ],
    "readme_title": "Dashboard 20 – Product Launch",
}

DASHBOARDS.append(
    {
        "id": "dashboard-20",
        "directory": "dashboard-20-product-launch",
        "name": "Product Launch",
        "description": "لوحة إطلاق منتج لمتابعة الاستعدادات، المخاطر، والتبعيات عبر الفرق.",
        "grid": {
            "desktop": "Metrics row, readiness chart, milestone table, GTM and dependency panels.",
            "tablet": "Metrics wrap, panels stack under table.",
            "mobile": "Stacked layout, table cards, modal full screen.",
        },
        "components": [
            "Filter header",
            "Launch KPIs",
            "Readiness chart",
            "Milestone table",
            "GTM panels",
            "Risk modal",
            "Launch FAB"
        ],
        "colors": {
            "primary": "#312e81",
            "accent": "#f59e0b",
            "bg": "#1e1b4b",
            "surface": "#312e81",
            "text": "#ede9fe"
        },
        "snippets": {
            "layout": "min-h-screen bg-indigo-950 text-indigo-50",
            "topbar": "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5",
            "card": "rounded-2xl border border-white/10 bg-indigo-900/60 p-5",
            "chart": "rounded-2xl border border-amber-400/40 bg-amber-400/10",
            "table": "rounded-2xl border border-white/10 bg-indigo-900/40",
            "filter": "rounded-full border border-white/10 bg-white/10 px-4 py-2",
            "fab": "fixed bottom-8 end-8 rounded-full bg-amber-400 px-5 py-3 text-indigo-950"
        },
        "responsive": {
            "desktop": "Chart + table align, panels below.",
            "tablet": "Panels drop, metrics wrap.",
            "mobile": "Milestones as cards, modal full height.",
        },
        "accessibility": [
            "aria-describedby للمخاطر المسجلة.",
            "Focus ring amber-300.",
            "aria-live لتحديث حالة المراحل.",
        ],
        "interactions": [
            "Hover على الصفوف يظهر زر التحديث.",
            "Panels تستخدم transition-scale.",
            "المودال يعتمد data-[state=open] للتدرج.",
        ],
        "performance": [
            "مخطط الاستعداد lazy.",
            "تقسيم بيانات milestones عبر pagination.",
            "Memo لبطاقات GTM.",
        ],
        "assets": {
            "jsx": "Dashboard20.jsx",
            "css": "dashboard-20.css",
            "readme": "README.md",
            "thumbnail": "thumbnail.png"
        },
        "jsx": build_simple_jsx(launch_meta),
        "css": build_simple_css(launch_meta),
        "readme": build_simple_readme(launch_meta),
    }
)


if __name__ == "__main__":
    main()
