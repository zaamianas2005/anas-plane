import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, CalendarDays, Download, Search, RefreshCw, Printer, Layers, Clock, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

/**
 * Full‑Stack Web Dev — 7‑Month Daily Tracker
 * ---------------------------------------------------------
 * • Beautiful, single‑file React app with Tailwind + shadcn/ui
 * • 30 weeks (~210 days) grouped by phases
 * • Daily checkboxes + “mark week complete” switch
 * • LocalStorage persistence
 * • Global progress, search, filters, print‑friendly
 * • Reset/Export (JSON) controls
 */

// ---- Roadmap Data ---------------------------------------------------------

const PLAN = [
  {
    phase: "Phase 1",
    name: "HTML & CSS Foundations",
    color: "from-sky-400 to-blue-500",
    weeks: [
      {
        week: 1,
        title: "HTML Basics",
        focus: "Structure, semantics, forms, media, a11y",
        days: [
          "Web basics, HTML skeleton, headings & paragraphs",
          "Links, images, lists",
          "Forms: inputs, selects, buttons",
          "Semantic tags, block vs inline",
          "Media: video, audio, iframe",
          "Accessibility: alt, label, landmarks",
          "Review + build Resume page",
        ],
      },
      {
        week: 2,
        title: "CSS Basics",
        focus: "Selectors, box model, typography, colors",
        days: [
          "Selectors, units, color systems",
          "Box model: margin, padding, border",
          "Typography: fonts & text styles",
          "Backgrounds & gradients",
          "Positioning & display",
          "Flexbox fundamentals",
          "Project: Styled profile page",
        ],
      },
      {
        week: 3,
        title: "Layouts & Effects",
        focus: "Grid, responsive, transitions, variables",
        days: [
          "CSS Grid basics",
          "Advanced Flex patterns",
          "Responsive design: media queries",
          "CSS variables & design tokens",
          "Pseudo classes/elements",
          "Transitions & hover effects",
          "Project: Landing page",
        ],
      },
      {
        week: 4,
        title: "Portfolio Sprint",
        focus: "Components, navbar, footer, forms, deploy",
        days: [
          "Build card UI component",
          "Navigation bar patterns",
          "Footer layout",
          "Contact form styling",
          "Portfolio skeleton",
          "Make it responsive",
          "Review + deploy (GitHub Pages)",
        ],
      },
    ],
  },
  {
    phase: "Phase 2",
    name: "JavaScript Core",
    color: "from-emerald-400 to-teal-500",
    weeks: [
      {
        week: 5,
        title: "JS Fundamentals",
        focus: "Types, control flow, functions",
        days: [
          "Variables & data types",
          "Operators & expressions",
          "Conditionals (if/else)",
          "Loops (for/while)",
          "Functions",
          "Scope & hoisting",
          "Mini‑project: Calculator",
        ],
      },
      {
        week: 6,
        title: "Data & ES6",
        focus: "Arrays, objects, methods, ES6",
        days: [
          "Arrays",
          "Objects",
          "String methods",
          "Array methods: map/filter/reduce",
          "Date & Math",
          "ES6: let/const, arrows, template strings",
          "Project: Quiz app",
        ],
      },
      {
        week: 7,
        title: "DOM & Forms",
        focus: "DOM selectors, events, validation",
        days: [
          "DOM selection & traversal",
          "Events & listeners",
          "Create/update/remove elements",
          "Forms & validation",
          "localStorage",
          "Fetch API basics",
          "Project: To‑do app",
        ],
      },
      {
        week: 8,
        title: "JS Projects",
        focus: "APIs & small apps",
        days: [
          "Weather app (API)",
          "Image slider",
          "Countdown timer",
          "Notes app",
          "Modal / lightbox",
          "Review concepts",
          "Deploy JS projects",
        ],
      },
      {
        week: 9,
        title: "Git + npm",
        focus: "Git workflows, npm scripts",
        days: [
          "Git basics (init/add/commit)",
          "GitHub push/pull",
          "Branching & merging",
          "npm & package.json",
          "Modules (import/export)",
          "Code organization",
          "Mini‑project polish",
        ],
      },
      {
        week: 10,
        title: "Async & Error Handling",
        focus: "Promises, async/await, try/catch",
        days: [
          "Callbacks → Promises",
          "Creating & chaining Promises",
          "async/await patterns",
          "Error handling & retries",
          "Loading & empty states",
          "Refactor to async/await",
          "Project review day",
        ],
      },
    ],
  },
  {
    phase: "Phase 3",
    name: "React Frontend",
    color: "from-fuchsia-400 to-purple-500",
    weeks: [
      {
        week: 11,
        title: "React Setup & JSX",
        focus: "Vite, components, props/state",
        days: [
          "Tooling: Vite, dev server, file structure",
          "JSX & components",
          "Props & composition",
          "State (useState)",
          "Events & handlers",
          "Conditional rendering",
          "Project: Counter app",
        ],
      },
      {
        week: 12,
        title: "Hooks & Data",
        focus: "useEffect, fetch, custom hooks",
        days: [
          "Lists & keys",
          "Controlled forms",
          "useState deep dive",
          "useEffect lifecycle",
          "Fetching data in components",
          "Custom hooks",
          "Project: Weather in React",
        ],
      },
      {
        week: 13,
        title: "Routing",
        focus: "React Router, params, guards",
        days: [
          "Routing basics",
          "Dynamic routes",
          "useParams & navigation",
          "Protected routes",
          "Layouts & nested routes",
          "Error boundaries & 404",
          "Project: Blog app",
        ],
      },
      {
        week: 14,
        title: "UI Systems",
        focus: "Design system, forms, tables",
        days: [
          "Design tokens with CSS vars",
          "Reusable buttons/inputs",
          "Form abstraction",
          "Table & pagination",
          "Toast & dialog patterns",
          "Loading/skeleton states",
          "Refactor UI kit",
        ],
      },
      {
        week: 15,
        title: "State & Perf",
        focus: "Context, memo, perf tips",
        days: [
          "Context API",
          "Memoization & useMemo",
          "useCallback & expensive renders",
          "List virtualization basics",
          "Error & suspense (concepts)",
          "Bundle & code‑split",
          "Perf audit day",
        ],
      },
      {
        week: 16,
        title: "Deploy & Polish",
        focus: "Build, env, deploy, docs",
        days: [
          "Env vars & configs",
          "Reusable hooks cleanup",
          "Accessibility pass",
          "E2E smoke with Playwright (concept)",
          "Deploy to Vercel",
          "Docs & README",
          "React portfolio review",
        ],
      },
    ],
  },
  {
    phase: "Phase 4",
    name: "Backend with Node.js",
    color: "from-amber-400 to-orange-500",
    weeks: [
      {
        week: 17,
        title: "Node & Express",
        focus: "HTTP, routing, middleware",
        days: [
          "Node runtime & npm scripts",
          "Express setup & routers",
          "Middleware patterns",
          "Parsing JSON & validation",
          "REST design",
          "Error handling",
          "Project: Tasks API",
        ],
      },
      {
        week: 18,
        title: "Express Advanced",
        focus: "Params, query, files, logging",
        days: [
          "Query & route params",
          "File uploads (multer)",
          "Static assets",
          "Logging & morgan",
          "Rate limits & helmet",
          "CORS & security basics",
          "API docs (OpenAPI)",
        ],
      },
      {
        week: 19,
        title: "MongoDB Basics",
        focus: "CRUD, schema design",
        days: [
          "Mongo shell & Atlas",
          "CRUD operations",
          "Indexes & performance",
          "Mongoose models",
          "Relations & refs",
          "Aggregation intro",
          "Project: Blog API",
        ],
      },
      {
        week: 20,
        title: "Mongo + Express",
        focus: "Validation, services, repos",
        days: [
          "Validation with Zod/Joi",
          "Service layer structure",
          "Repository pattern",
          "Unit tests (concept)",
          "Seed & migration basics",
          "API versioning",
          "Deploy backend (Render/Fly)",
        ],
      },
      {
        week: 21,
        title: "Auth & Security",
        focus: "bcrypt, JWT, guards",
        days: [
          "Password hashing (bcrypt)",
          "JWT access/refresh",
          "Auth middleware",
          "RBAC basics",
          "Input sanitization",
          "OWASP top 10 (intro)",
          "Project: Auth system",
        ],
      },
      {
        week: 22,
        title: "Integration Week",
        focus: "Docs, testing, monitoring",
        days: [
          "Postman collections",
          "Integration tests (concept)",
          "Health checks",
          "Logging & errors",
          "Monitoring (uptime)",
          "CI basics (GitHub Actions)",
          "Backend review",
        ],
      },
    ],
  },
  {
    phase: "Phase 5",
    name: "Full‑Stack Integration",
    color: "from-rose-400 to-red-500",
    weeks: [
      {
        week: 23,
        title: "Connect FE + BE",
        focus: "CORS, services, DTOs",
        days: [
          "Project scaffolding",
          "API service in React",
          "Auth flow wiring",
          "Protected routes",
          "Error toasts & retries",
          "Pagination & filters",
          "Milestone demo",
        ],
      },
      {
        week: 24,
        title: "Task Manager App",
        focus: "CRUD, lists, status",
        days: [
          "Task model & routes",
          "Create task UI",
          "Update & status",
          "List & filters",
          "Search & sorting",
          "Unit of work review",
          "Ship v1",
        ],
      },
      {
        week: 25,
        title: "Files & Media",
        focus: "Uploads, images, CDN",
        days: [
          "Upload UI",
          "Server handling",
          "Image preview",
          "Storage strategy",
          "CDN notes",
          "Clean‑up scripts",
          "Mini release",
        ],
      },
      {
        week: 26,
        title: "Social Mini‑Clone",
        focus: "Posts, likes, profiles",
        days: [
          "Feed & post creation",
          "Likes & counters",
          "User profiles",
          "Comments",
          "Optimistic updates",
          "Infinite scroll",
          "Alpha test",
        ],
      },
      {
        week: 27,
        title: "Deploy & Observability",
        focus: "Vercel + Render + Atlas",
        days: [
          "Env & secrets",
          "Build pipelines",
          "DB provisioning",
          "Domain & SSL",
          "Uptime monitor",
          "Error tracking",
          "Launch checklist",
        ],
      },
      {
        week: 28,
        title: "Hardening & Docs",
        focus: "Security, tests, README",
        days: [
          "Threat model lite",
          "Rate limit review",
          "E2E happy path",
          "Performance sweep",
          "Docs & screenshots",
          "Changelog",
          "Capstone polish",
        ],
      },
    ],
  },
  {
    phase: "Phase 6",
    name: "Advanced & Career Prep",
    color: "from-lime-400 to-green-500",
    weeks: [
      {
        week: 29,
        title: "TypeScript Basics",
        focus: "Types, generics, React TS",
        days: [
          "Type system & tsconfig",
          "Basic types & unions",
          "Interfaces & generics",
          "Functions & utils",
          "React with TS",
          "Migrate a small app",
          "TS review",
        ],
      },
      {
        week: 30,
        title: "Next.js & Portfolio",
        focus: "SSR/ISR, API routes, career kit",
        days: [
          "Next.js pages/routes",
          "Data fetching (SSR/ISR)",
          "API routes",
          "Auth in Next.js",
          "Portfolio website",
          "CV + GitHub polish",
          "Interview prep",
        ],
      },
    ],
  },
];

// ---- Utilities ------------------------------------------------------------

const STORAGE_KEY = "fswd_7mo_tracker_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

// Compute total days for percentages
function countTotalDays() {
  let total = 0;
  PLAN.forEach((p) => p.weeks.forEach((w) => (total += w.days.length)));
  return total;
}

// ---- Components -----------------------------------------------------------

function Header({ completedDays, totalDays, onPrint, onReset, onExport, query, setQuery }) {
  const pct = Math.round((completedDays / totalDays) * 100);
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Layers className="w-6 h-6" />
        <div className="mr-auto">
          <div className="text-lg font-semibold">Full‑Stack 7‑Month Daily Tracker</div>
          <div className="text-sm text-muted-foreground flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4"/>210 days</span>
            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4"/>{pct}% complete</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-2.5 text-muted-foreground"/>
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search topics…" className="pl-8 w-64"/>
          </div>
          <Button variant="secondary" onClick={onPrint} className="gap-2"><Printer className="w-4 h-4"/>Print</Button>
          <Button variant="outline" onClick={onExport} className="gap-2"><Download className="w-4 h-4"/>Export</Button>
          <Button variant="destructive" onClick={onReset} className="gap-2"><RefreshCw className="w-4 h-4"/>Reset</Button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pb-3">
        <Progress value={pct} />
      </div>
    </div>
  );
}

function Phase({ phase, progress, toggleDay, toggleWeek, expanded, setExpanded, query }) {
  const comp = useMemo(() => {
    let completed = 0, total = 0;
    phase.weeks.forEach((w) => {
      w.days.forEach((_, dIdx) => {
        total += 1;
        if (progress?.[phase.phase]?.[w.week]?.days?.[dIdx]) completed += 1;
      });
    });
    return { completed, total };
  }, [phase, progress]);

  const pct = Math.round((comp.completed / comp.total) * 100);
  const isOpen = expanded === phase.phase;

  return (
    <Card className="overflow-hidden">
      <CardHeader onClick={() => setExpanded(isOpen ? null : phase.phase)} className="cursor-pointer select-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className={`inline-block w-2 h-6 rounded bg-gradient-to-b ${phase.color}`}></span>
              {phase.phase}: {phase.name}
            </CardTitle>
            <CardDescription>
              {comp.completed} / {comp.total} days • {pct}%
            </CardDescription>
          </div>
          {isOpen ? <ChevronDown className="w-5 h-5"/> : <ChevronRight className="w-5 h-5"/>}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {phase.weeks.map((week) => (
              <Week
                key={week.week}
                phaseId={phase.phase}
                week={week}
                progress={progress?.[phase.phase]?.[week.week]}
                toggleDay={toggleDay}
                toggleWeek={toggleWeek}
                query={query}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function Week({ phaseId, week, progress, toggleDay, toggleWeek, query }) {
  const allChecked = useMemo(() => week.days.every((_, i) => progress?.days?.[i]), [week, progress]);
  const weekMatched = useMemo(() =>
    (week.title + " " + week.focus + " " + week.days.join(" ")).toLowerCase().includes(query.toLowerCase()), [week, query]
  );
  if (query && !weekMatched) return null;

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Badge variant={allChecked ? "default" : "secondary"}>Week {week.week}</Badge>
        <div className="font-semibold text-base mr-auto">{week.title}</div>
        <div className="text-sm text-muted-foreground">{week.focus}</div>
        <Separator orientation="vertical" className="h-6"/>
        <div className="flex items-center gap-2">
          <span className="text-sm">Mark week complete</span>
          <Switch checked={allChecked} onCheckedChange={() => toggleWeek(phaseId, week.week, !allChecked)} />
        </div>
      </div>
      <ul className="grid md:grid-cols-2 gap-2">
        {week.days.map((label, idx) => {
          const checked = !!progress?.days?.[idx];
          return (
            <li key={idx} className={`group flex items-start gap-3 rounded-xl border p-3 ${checked ? "bg-green-50" : "bg-white"}`}>
              <button
                onClick={() => toggleDay(phaseId, week.week, idx)}
                className="mt-0.5"
                aria-label={checked ? "Uncheck day" : "Check day"}
              >
                {checked ? <CheckCircle2 className="w-5 h-5"/> : <Circle className="w-5 h-5 text-muted-foreground"/>}
              </button>
              <div className="text-sm leading-snug">
                <div className={`font-medium ${checked ? "line-through text-muted-foreground" : ""}`}>Day {idx + 1}</div>
                <div className={`text-muted-foreground ${checked ? "line-through" : ""}`}>{label}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FullStackRoadmapTracker() {
  const totalDays = useMemo(() => countTotalDays(), []);
  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState(PLAN[0].phase);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completedDays = useMemo(() => {
    let done = 0;
    PLAN.forEach((phase) =>
      phase.weeks.forEach((w) =>
        w.days.forEach((_, dIdx) => {
          if (progress?.[phase.phase]?.[w.week]?.days?.[dIdx]) done += 1;
        })
      )
    );
    return done;
  }, [progress]);

  const toggleDay = (phaseId, weekNum, dayIdx) => {
    setProgress((prev) => {
      const copy = { ...prev };
      copy[phaseId] = copy[phaseId] || {};
      copy[phaseId][weekNum] = copy[phaseId][weekNum] || { days: {} };
      copy[phaseId][weekNum].days = { ...copy[phaseId][weekNum].days, [dayIdx]: !copy[phaseId][weekNum].days?.[dayIdx] };
      return copy;
    });
  };

  const toggleWeek = (phaseId, weekNum, targetChecked) => {
    setProgress((prev) => {
      const copy = { ...prev };
      const week = PLAN.find((p) => p.phase === phaseId)?.weeks.find((w) => w.week === weekNum);
      if (!week) return prev;
      copy[phaseId] = copy[phaseId] || {};
      copy[phaseId][weekNum] = copy[phaseId][weekNum] || { days: {} };
      const newDays = {};
      week.days.forEach((_, idx) => (newDays[idx] = !!targetChecked));
      copy[phaseId][weekNum].days = newDays;
      return copy;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Reset all progress?")) {
      setProgress({});
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fullstack-7mo-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white print:bg-white">
      <Header
        completedDays={completedDays}
        totalDays={totalDays}
        onPrint={handlePrint}
        onReset={handleReset}
        onExport={handleExport}
        query={query}
        setQuery={setQuery}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Your 210‑day journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Total days</span>
                  <Badge variant="secondary">{totalDays}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Completed</span>
                  <Badge>{completedDays}</Badge>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  Use the search to quickly find topics (e.g. “JWT”, “Grid”, “Fetch”).
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Progress is saved locally in your browser.
                </div>
              </CardFooter>
            </Card>
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>How to use</CardTitle>
                  <CardDescription>Daily timer method</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>Each day ≈ <b>2h 30m</b>:</p>
                  <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
                    <li>25m focus × 4 blocks (Pomodoro)</li>
                    <li>+ 30m hands‑on project</li>
                    <li>Take 5m micro‑breaks between blocks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Content */}
          <section className="lg:col-span-3 space-y-6">
            {PLAN.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Phase
                  phase={phase}
                  progress={progress}
                  toggleDay={toggleDay}
                  toggleWeek={toggleWeek}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  query={query}
                />
              </motion.div>
            ))}

            <div className="text-center text-sm text-muted-foreground">
              Tip: Use <kbd>Ctrl/Cmd + P</kbd> to print a PDF checklist.
            </div>
          </section>
        </div>
      </main>

      {/* Print styles */}
      <style>{`
        @media print {
          .sticky { position: static !important; }
          .print\:bg-white { background: white !important; }
          button, input { display: none !important; }
          a { text-decoration: none; }
        }
      `}</style>
    </div>
  );
}
