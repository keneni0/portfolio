import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, type ProjectItem } from "../../data/projects";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project not found | Keneni Asefa" };
  }
  return {
    title: `${project.name} | Projects | Keneni Asefa`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const docBySlug: Record<
    string,
    {
      overview: string;
      keyFeatures: string[];
      technical: string[];
      currentStatus: string[];
    }
  > = {
    codexhub: {
      overview:
        "CodexHub is a central place to share reusable snippets, patterns, and small utilities across projects, keeping code review and collaboration efficient.",
      keyFeatures: [
        "Organised snippet library with tags and language filters.",
        "Clean, minimal interface focused on reading and understanding code.",
        "Space for notes around why a snippet exists and how to use it safely.",
      ],
      technical: [
        "Next.js + React front-end styled with Tailwind CSS.",
        "TypeScript for type-safety and clearer contracts between components.",
        "Backed by MongoDB for flexible document-style storage.",
      ],
      currentStatus: [
        "Core browsing experience working.",
        "Iterating on editing flows and access controls.",
        "Planned: richer search and personal collections.",
      ],
    },
    fmovies: {
      overview:
        "A UI-focused clone of a streaming platform, built to explore layout, theming, and interaction patterns for media-heavy apps.",
      keyFeatures: [
        "Landing and listing pages inspired by modern streaming services.",
        "Search and filter experiences tuned for large catalogues.",
        "Responsive layout that works across desktop and mobile.",
      ],
      technical: [
        "React front-end with TypeScript for safer components.",
        "Integration with TMDB-style APIs for movie metadata.",
        "Heavy use of reusable UI primitives and layout utilities.",
      ],
      currentStatus: [
        "Core views complete.",
        "Polishing transitions and loading states.",
        "Potential future work: watchlist and per-user preferences.",
      ],
    },
    trackizer: {
      overview:
        "Trackizer keeps recurring subscriptions visible so they do not silently drain your budget.",
      keyFeatures: [
        "Dashboard summarising upcoming renewals and monthly spend.",
        "Per-subscription detail with notes and categories.",
        "Simple alerts around renewal dates and price changes.",
      ],
      technical: [
        "React front-end talking to a Node.js + Express API.",
        "MongoDB persistence for subscriptions and user data.",
        "Designed with a component-driven architecture to be easy to extend.",
      ],
      currentStatus: [
        "Core CRUD flows working end-to-end.",
        "Exploring integrations with payment providers and email reminders.",
        "Future ideas: exportable reports and shared accounts.",
      ],
    },
    "data-exfiltration-simulator": {
      overview:
        "A controlled lab to model data exfiltration paths and test how defensive controls respond.",
      keyFeatures: [
        "Repeatable scenarios that simulate different exfiltration techniques.",
        "Focus on understanding where logs appear across the stack.",
        "Room to plug in custom scripts and payloads.",
      ],
      technical: [
        "Python tooling orchestrating scenarios on Linux hosts.",
        "Modular design so new scenarios can be added as separate modules.",
        "Built with teaching and red-team training in mind.",
      ],
      currentStatus: [
        "Core scenarios implemented.",
        "Improving documentation around setup and teardown.",
        "Planned: integration examples with SIEM / detection rules.",
      ],
    },
    "deepfake-detection": {
      overview:
        "An experiment in using deep learning to detect manipulated media and deepfakes.",
      keyFeatures: [
        "Model pipeline able to score input media for likely manipulation.",
        "Focus on explainability via simple visualisation of predictions.",
        "Room to compare different model architectures and datasets.",
      ],
      technical: [
        "Python-based experimentation environment.",
        "PyTorch models for image and video classification.",
        "Support code for dataset loading, training loops, and evaluation.",
      ],
      currentStatus: [
        "Initial experiments running.",
        "Evaluating model performance across different sample sets.",
        "Future work: more robust datasets and deployment paths.",
      ],
    },
  };

  const docs =
    docBySlug[project.slug as keyof typeof docBySlug] ??
    docBySlug["codexhub"];

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] px-4 py-10 text-slate-100 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-3 border-b border-slate-800 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400">
            /projects/{project.slug}
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            {project.name}
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="rounded-full border border-emerald-500/40 bg-slate-950/70 px-3 py-1 text-emerald-300">
              path: /src/projects/{project.slug}
            </span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200">
              {project.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 ${
                project.status === "Completed"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : project.status === "In-progress"
                    ? "bg-amber-500/15 text-amber-300"
                    : "bg-slate-600/20 text-slate-200"
              }`}
            >
              {project.status}
            </span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
              Updated: {project.updated}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-slate-950/80 px-4 py-1 text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
            >
              <span>View Code</span>
              <span className="text-[9px] text-emerald-300">↗</span>
            </a>
          </div>
        </header>

        <section className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5">
          <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
            Overview
          </h2>
          <p className="text-sm text-slate-300">{docs.overview}</p>
        </section>

        <section className="grid gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 sm:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
              Highlights
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {docs.keyFeatures.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
              Stack & Tags
            </h3>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-900/90 px-3 py-1 text-emerald-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
              Technical Approach
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {docs.technical.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
              Current Status
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {docs.currentStatus.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex justify-between text-[11px] font-mono text-slate-500">
          <Link
            href="/projects"
            className="text-slate-400 transition hover:text-emerald-300"
          >
            ← back to /projects
          </Link>
          <Link
            href="/"
            className="text-slate-400 transition hover:text-emerald-300"
          >
            ← back to /home
          </Link>
        </div>
      </div>
    </main>
  );
}


