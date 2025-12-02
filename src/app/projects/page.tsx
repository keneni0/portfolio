"use client";

import Link from "next/link";
import type { Metadata } from "next";
import { useMemo, useState } from "react";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Projects | Keneni Asefa",
};

const FILTERS = ["All", "Web Apps", "Frontend", "Productivity", "Security Tools", "AI / ML"];

export default function ProjectsIndex() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] px-4 py-10 text-slate-100 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-3 border-b border-slate-800 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400">
            /projects
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">
            All Projects
          </h1>
          <p className="max-w-xl text-sm text-slate-400">
            A comprehensive view of my cybersecurity, tooling, and application
            projects, with directory-style navigation.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-mono transition ${
                    isActive
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-200"
                      : "border-slate-800 bg-slate-950/80 text-slate-400 hover:border-emerald-400 hover:text-emerald-200"
                  }`}
                >
                  {filter === "All" ? "All" : filter}
                </button>
              );
            })}
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <article
              key={project.slug}
              className="group rounded-xl border border-slate-800 bg-slate-950/70 p-5 shadow-[0_0_25px_rgba(15,23,42,0.9)] transition hover:border-emerald-500/60 hover:bg-slate-900/80"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {project.description}
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/40 bg-slate-950/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-300">
                  /projects/{project.slug}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[10px] font-mono">
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    project.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : project.status === "In-progress"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-slate-600/20 text-slate-300"
                  }`}
                >
                  {project.status}
                </span>
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-slate-300">
                  {project.category}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-900">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] font-mono text-slate-500">
                Progress: {project.progress}% · Updated: {project.updated}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-900/90 px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] font-mono">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 transition hover:bg-emerald-500/20"
                >
                  <span>Project Overview</span>
                </Link>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-500/60 bg-slate-950/80 px-3 py-1 text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
                >
                  <span>Code</span>
                  <span className="text-[9px] text-emerald-300">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

