"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { projects, type ProjectItem } from "./data/projects";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

type GitHubStats = {
  publicRepos: number | null;
  followers: number | null;
};

const experience: ExperienceItem[] = [
  {
    role: "Bug Bounty Hunter",
    company: "Bugcrowd & Intigriti",
    period: "Sep 2025 – Present",
    highlights: [
      "Actively test production systems in live bug bounty programs.",
      "Focus on logic flaws, authentication bypasses, and high-impact web vulns.",
      "Deliver actionable, proof-backed reports to program triage teams.",
    ],
  },
  {
    role: "Web Security Assistant",
    company: "Menas Cyber Solution",
    period: "Aug 2025 – Present",
    highlights: [
      "Assist with security reviews of client-facing web applications.",
      "Help translate technical findings into remediation guidance for dev teams.",
      "Contribute to internal playbooks, checklists, and secure-by-default patterns.",
    ],
  },
  {
    role: "Jr. Penetration Tester",
    company: "INSA",
    period: "July 2025 – Sep 2025",
    highlights: [
      "Joined team-based penetration tests targeting web and infrastructure assets.",
      "Prepared concise reports that captured risk, impact, and exploitation steps.",
      "Worked closely with senior testers to refine methodology and tooling.",
    ],
  },
  {
    role: "Cybersecurity Division Member",
    company: "CSEC-ASTU",
    period: "May 2025 – Present",
    highlights: [
      "Regularly participate in CTFs, labs, and internal security workshops.",
      "Collaborate with peers on offensive security challenges and writeups.",
      "Share tooling, recon techniques, and learning resources with the community.",
    ],
  },
];

const certifications = [
  "API Penetration Testing – APISEC University",
  "Web Application Hacking & Bug Bounty – Udemy",
  "Google Cybersecurity Professional",
  "ThreatX Security Training",
];

const ROLES = [
  "Penetration Tester",
  "Bug Bounty Hunter",
  "Offensive Security Specialist",
  "Software Engineer",
] as const;

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [whoamiText, setWhoamiText] = useState("");
  const [displayRole, setDisplayRole] = useState("");
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    publicRepos: null,
    followers: null,
  });
  const [contactError, setContactError] = useState<string | null>(null);

  const panelClasses =
    theme === "dark"
      ? {
          section: "border-slate-800/80 bg-[#030504]",
          card: "border-slate-800/70 bg-slate-950/70",
          glass: "border-slate-800 bg-black/70",
          accentEmerald: "border-emerald-500/40 bg-black/60",
          accentCyan: "border-cyan-500/40 bg-black/60",
          accentNeutral: "border-slate-800 bg-black/60",
          status: "border-emerald-500/40 bg-black/60",
          pill: "bg-slate-900/80 text-slate-300",
          chip: "bg-slate-900/90 text-slate-300",
        }
      : {
          section: "border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.07)]",
          card: "border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.05)]",
          glass: "border-slate-200 bg-slate-50/90 backdrop-blur",
          accentEmerald: "border-emerald-200 bg-emerald-50",
          accentCyan: "border-cyan-200 bg-cyan-50",
          accentNeutral: "border-slate-200 bg-white/90",
          status: "border-emerald-200 bg-emerald-50/80",
          pill: "bg-slate-100 text-slate-700",
          chip: "bg-slate-100 text-slate-700",
        };

  const textPalette =
    theme === "dark"
      ? {
          heading: "text-slate-100",
          body: "text-slate-300",
        }
      : {
          heading: "text-slate-900",
          body: "text-slate-700",
        };

  const accentText = theme === "dark" ? "text-emerald-300" : "text-emerald-700";
  const accentCyanText = theme === "dark" ? "text-cyan-300" : "text-cyan-700";

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") ?? "").toString().trim();
    const email = (formData.get("email") ?? "").toString().trim();
    const message = (formData.get("message") ?? "").toString().trim();

    if (!name || !email || !message) {
      setContactError("Please fill in your name, email, and message.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name} <${email}>\nSource: Portfolio contact form`,
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=keneniasefa14@gmail.com&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
    form.reset();
  };

  // Dark / light mode toggle
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("light-mode", theme === "light");
    }
  }, [theme]);

  // Typing animation for whoami
  useEffect(() => {
    const fullText = "> whoami → Keneni Asefa";
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setWhoamiText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for rotating roles in hero subtitle
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const full = ROLES[roleIndex];
      if (!full) return;

      if (charIndex <= full.length) {
        setDisplayRole(full.slice(0, charIndex));
        charIndex += 1;
        timeoutId = setTimeout(type, 80);
      } else {
        // pause on full word, then move to next role
        timeoutId = setTimeout(() => {
          roleIndex = (roleIndex + 1) % ROLES.length;
          charIndex = 0;
          setDisplayRole("");
          type();
        }, 1400);
      }
    };

    type();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Fetch basic GitHub stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://api.github.com/users/keneni0");
        if (!res.ok) return;
        const data = await res.json();
        setGithubStats({
          publicRepos: data.public_repos ?? null,
          followers: data.followers ?? null,
        });
      } catch {
        // ignore network errors, show placeholders
      }
    }
    fetchStats();
  }, []);

  const mainThemeClasses =
    theme === "dark"
      ? "bg-[#0a0a0a] text-slate-100"
      : "bg-slate-50 text-slate-900";

  return (
    <main
      id="home"
      className={`min-h-screen w-full px-4 py-6 sm:px-8 lg:px-16 ${mainThemeClasses}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {/* Sticky navigation */}
        <header
          className={`sticky top-0 z-40 mb-4 flex items-center justify-between gap-4 border-b px-3 py-3 backdrop-blur sm:px-4 ${
            theme === "dark"
              ? "border-slate-800/70 bg-[#050608]/90"
              : "border-slate-200 bg-white/80"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/60 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 text-xs font-mono font-semibold tracking-[0.18em] shadow-[0_0_18px_rgba(34,197,94,0.3)] ${accentText}`}
            >
              KA
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-slate-400">
                Keneni Asefa
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Penetration Tester &amp; Bug Bounty Hunter
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-[11px] font-mono text-slate-400 md:flex">
            <a href="#home" className="hover:text-emerald-400 transition-colors">
              Home
            </a>
            <a
              href="#experience"
              className="hover:text-emerald-400 transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="hover:text-emerald-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-emerald-400 transition-colors"
            >
              Skills
            </a>
            <a
              href="#certifications"
              className="hover:text-emerald-400 transition-colors"
            >
              Certifications
            </a>
            <a
              href="#contact"
              className="hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>
          </nav>
          <button
            type="button"
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs shadow-sm transition hover:border-emerald-400 ${theme === "dark" ? "border-slate-700 bg-slate-900/60 text-slate-300 hover:text-emerald-300" : "border-slate-200 bg-white text-slate-700 hover:text-emerald-600"}`}
            aria-label="Toggle dark / light mode"
          >
            {theme === "dark" ? "☾" : "☼"}
          </button>
        </header>

        {/* Hero section */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center animate-fade-in-up">
          {/* Left: Intro */}
          <div className="space-y-6">
            <div
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-mono text-emerald-600 shadow-[0_0_18px_rgba(34,197,94,0.4)] ${
                theme === "dark"
                  ? "border-emerald-500/60 bg-black/60 text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.7)]"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
              <span>./keneni.sh</span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              <span
                className={`block font-mono text-sm uppercase tracking-[0.3em] ${
                  theme === "dark" ? "text-slate-200" : "text-slate-600"
                }`}
              >
                Hello, I&apos;m
              </span>
              <span className="mt-1 block text-4xl sm:text-5xl font-semibold text-emerald-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]">
                Keneni Asefa
              </span>
              <span
                className={`mt-3 block font-mono text-sm sm:text-base ${
                  theme === "dark" ? "text-slate-200" : "text-slate-600"
                }`}
              >
                I&apos;m a{" "}
                <span
                  className={`inline-block min-w-[210px] rounded-md px-2 py-1 transition-colors ${
                    theme === "dark"
                      ? "bg-emerald-500/10 text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.5)]"
                      : "bg-emerald-50 text-emerald-700 shadow-[0_10px_25px_rgba(16,185,129,0.2)]"
                  }`}
                >
                  {displayRole || "\u00a0"}
                </span>
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              Breaking systems ethically to surface real attack paths, chain exploits, and
              turn findings into practical hardening guidance.
            </p>
          <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-slate-950 shadow-[0_0_25px_rgba(52,211,153,0.8)] transition hover:bg-emerald-400"
              >
                View My Work
          </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`rounded-full border px-6 py-2 text-sm font-medium backdrop-blur transition hover:border-emerald-400 hover:text-emerald-200 ${
                  theme === "dark"
                    ? "border-emerald-500/40 bg-slate-900/50 text-emerald-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                Contact Me
              </a>
              <a
                href="https://drive.google.com/file/d/1vFrk1Q4g1CYuX4VwDKW8N5-2vXJkeefT/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border px-6 py-2 text-sm font-medium backdrop-blur transition hover:border-cyan-300 hover:text-cyan-500 ${
                  theme === "dark"
                    ? "border-cyan-400/60 bg-slate-900/40 text-cyan-200"
                    : "border-cyan-200 bg-cyan-50 text-cyan-700"
                }`}
              >
                Download CV
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Available for freelance pentesting &amp; bug bounty programs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>Adama, Ethiopia</span>
              </div>
            </div>
          </div>
        </section>

        {/* Status bar under hero */}
        <section
          className={`mt-2 flex flex-wrap items-center justify-center gap-4 rounded-full border px-6 py-3 text-[11px] font-mono shadow-[0_0_25px_rgba(34,197,94,0.2)] ${panelClasses.status} ${
            theme === "dark" ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
            <span className={`uppercase tracking-[0.18em] ${accentText}`}>
              Encryption: Active
            </span>
          </div>
          <span className="hidden text-slate-600 sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
            <span className={`uppercase tracking-[0.18em] ${accentCyanText}`}>
              Status: Secure
            </span>
          </div>
          <span className="hidden text-slate-600 sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.9)]" />
            <span className="uppercase tracking-[0.18em] text-lime-300">
              System: Operational
            </span>
          </div>
        </section>

        {/* About Me */}
        <section
          id="about"
          className={`space-y-6 rounded-2xl border p-6 sm:p-8 shadow-[0_0_35px_rgba(16,185,129,0.15)] animate-fade-in-up ${panelClasses.section}`}
        >
          <div className="text-center space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-400">
              &gt;_ About Me
            </p>
            <p className="text-sm text-slate-400">
              Passionate cybersecurity practitioner focused on building secure systems
              and breaking them to make them better.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.2fr,minmax(0,1fr)]">
            {/* Bio */}
            <article
              className={`rounded-2xl border shadow-[0_0_30px_rgba(16,185,129,0.18)] ${panelClasses.accentEmerald}`}
            >
              <div
                className={`flex items-center justify-between border-b px-4 py-2 ${
                  theme === "dark" ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <span className={`font-mono text-[11px] ${accentText}`}>./keneni/bio.sh</span>
                <span className="text-[10px] text-slate-500">~ /about_me</span>
              </div>
              <div className={`space-y-4 p-5 text-sm ${textPalette.body}`}>
                <p className="font-mono text-[11px] text-emerald-400">$ cat about_me.txt</p>
                <p>
                  Offensive security specialist blending structured recon, proof-backed
                  exploitation, and clear reporting. Currently pursuing{" "}
              <span className={`font-semibold ${accentText}`}>
                    BSc Software Engineering @ ASTU
              </span>
                  , leading CSEC-ASTU offensive practice sessions, and engaging in
                  live bug bounty programs.
                </p>
                <p>
                  I thrive on solving real-world security problems: mapping attack paths,
                  documenting impact with precision, and translating findings into
                  actionable hardening guidance.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {["Security", "Pentesting", "Bug Bounties", "CTF Player"].map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 font-mono ${
                        theme === "dark"
                          ? "border-emerald-500/40 text-emerald-300"
                          : "border-emerald-200 text-emerald-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
            </div>
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Education */}
              <article
                className={`rounded-2xl border shadow-[0_0_30px_rgba(6,182,212,0.18)] ${panelClasses.accentCyan}`}
              >
                <div
                  className={`flex items-center justify-between border-b px-4 py-2 ${
                    theme === "dark" ? "border-slate-800" : "border-slate-200"
                  }`}
                >
                  <span className={`font-mono text-[11px] ${accentCyanText}`}>./keneni/education.sh</span>
                  <span className="text-[10px] text-slate-500">tail -f education.log</span>
                </div>
                <div className={`space-y-4 p-5 text-sm ${textPalette.body}`}>
            <div>
                    <p className={`text-xs font-mono uppercase tracking-[0.2em] ${accentCyanText}`}>
                      BSc, Software Engineering
              </p>
                    <p className={`font-semibold ${textPalette.heading}`}>
                      Adama Science &amp; Technology University
                    </p>
                    <p className="text-xs text-slate-500">2022 – Present</p>
            </div>
            <div>
                    <p className={`text-xs font-mono uppercase tracking-[0.2em] ${accentCyanText}`}>
                      Communities
                    </p>
                    <ul className="mt-2 space-y-2 text-[11px] font-mono leading-relaxed">
                      <li>▸ Member, ASTU CSEC Cybersecurity Club</li>
                      <li>▸ Member, Ethiopian Cybersecurity Association</li>
                      <li>▸ Regional workshops on web security &amp; recon</li>
                    </ul>
            </div>
                </div>
              </article>

              {/* Certifications snapshot */}
              <article
                className={`rounded-2xl border shadow-[0_0_30px_rgba(34,197,94,0.18)] ${panelClasses.accentEmerald}`}
              >
                <div
                  className={`flex items-center justify-between border-b px-4 py-2 ${
                    theme === "dark" ? "border-slate-800" : "border-slate-200"
                  }`}
                >
                <span className={`font-mono text-[11px] ${accentText}`}>./keneni/certs.sh</span>
                  <span className="text-[10px] text-slate-500">watch -n1 cert_status</span>
                </div>
                <div className={`space-y-4 p-5 text-sm ${textPalette.body}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    Highlighted Credentials
                  </p>
                  <div className="space-y-3 text-[12px]">
                    {certifications.slice(0, 4).map((cert) => (
                      <div
                        key={cert}
                        className={`rounded-lg border px-3 py-2 text-[11px] font-mono ${
                          theme === "dark"
                            ? "border-emerald-500/30 bg-slate-900/60 text-slate-200"
                            : "border-emerald-200 bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {cert}
              </div>
                    ))}
                    <div
                      className={`rounded-lg border px-3 py-2 text-[11px] font-mono ${
                        theme === "dark"
                          ? "border-emerald-500/30 bg-slate-900/60 text-slate-200"
                          : "border-emerald-200 bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      INSA Summer Camp 2025 Graduate
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <p className="font-mono text-[10px] text-slate-500">
              ./Experience.log
            </p>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Experience
            </h2>
          </div>
          <ol
            className={`relative space-y-6 border-l pl-6 ${
              theme === "dark" ? "border-slate-800" : "border-slate-200"
            }`}
          >
            {experience.map((item) => (
              <li key={`${item.role}-${item.company}`} className="relative">
                <span className="absolute -left-[9px] top-1 h-3 w-3 rounded-full border border-emerald-400 bg-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.7)]" />
                <div className={`rounded-xl border p-4 sm:p-5 ${panelClasses.card}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className={`text-sm font-semibold ${textPalette.heading}`}>
                        {item.role}
                      </p>
                      <p className="text-xs text-slate-400">{item.company}</p>
                    </div>
                    <p className="text-xs font-mono text-slate-500">
                      {item.period}
                    </p>
                  </div>
                  <ul className={`mt-3 space-y-1.5 text-xs ${textPalette.body}`}>
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <p className="font-mono text-[10px] text-slate-500">
              ./Projects.sh
            </p>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Projects
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project: ProjectItem) => (
              <article key={project.name} className="group">
                <div
                  className={`relative h-full transform rounded-xl border p-5 shadow-[0_0_25px_rgba(15,23,42,0.4)] transition duration-500 [transform-style:preserve-3d] hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:[transform:rotateY(6deg)] ${panelClasses.card}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`text-sm font-semibold ${textPalette.heading}`}>
                        {project.name}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] ${
                          theme === "dark"
                            ? "border-emerald-500/40 bg-slate-950/60 text-emerald-300"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        /projects/{project.slug}
                      </span>
                    </div>
                    <p className={`text-xs ${textPalette.body}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                      {project.tech.map((t: string) => (
                        <span key={t} className={`rounded-full px-2 py-0.5 ${panelClasses.chip}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">
                      overview: /src/projects/{project.slug}
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition group-hover:border-emerald-400 group-hover:text-emerald-200 ${
                        theme === "dark"
                          ? "border-emerald-500/60 bg-slate-950/80 text-emerald-300"
                          : "border-emerald-200 bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <span>GitHub</span>
                      <span className={`text-[9px] ${accentText}`}>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills & Tools */}
        <section
          id="skills"
          className={`space-y-6 rounded-2xl border p-6 sm:p-8 animate-fade-in-up ${panelClasses.section}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] text-slate-500">
                ./Skills_and_Tools.sh
              </p>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Skills &amp; Tools
              </h2>
            </div>
            <div
              className={`rounded-xl border px-4 py-2 text-[11px] font-mono ${
                theme === "dark" ? "text-cyan-200" : "text-cyan-700"
              } ${panelClasses.accentCyan}`}
            >
              <span className={`block text-[10px] uppercase tracking-[0.18em] ${accentCyanText}`}>
                GitHub Activity
              </span>
              <div className="mt-1 flex gap-4">
                <span>
                  Repos:{" "}
                  <span className={textPalette.heading}>
                    {githubStats.publicRepos ?? "—"}
                  </span>
                </span>
                <span>
                  Followers:{" "}
                  <span className={textPalette.heading}>
                    {githubStats.followers ?? "—"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div
            className={`relative z-10 rounded-2xl border p-6 shadow-[0_0_35px_rgba(16,185,129,0.15)] ${panelClasses.glass}`}
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-lg">
                    🎯
                  </div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.22em] text-emerald-400">
                    Offensive Security &amp; Pentesting
                  </h3>
                </div>
                <ul className={`space-y-3 text-[11px] font-mono leading-relaxed ${textPalette.body}`}>
                  <li>
                    <span className="text-emerald-400 mr-2">▸</span>
                    <span className={`font-semibold ${textPalette.heading}`}>
                      Recon &amp; Enumeration:
                    </span>{" "}
                    Nmap, ffuf, dirsearch, subfinder, Shodan, theHarvester, whois
                  </li>
                  <li>
                    <span className="text-emerald-400 mr-2">▸</span>
                    <span className={`font-semibold ${textPalette.heading}`}>Exploitation:</span>{" "}
                    Burp Suite, Metasploit, SQLMap, fuzzing (ffuf, wfuzz), Dirsearch, Nikto, Hydra, JohnTheRipper
                  </li>
                  <li>
                    <span className="text-emerald-400 mr-2">▸</span>
                    <span className={`font-semibold ${textPalette.heading}`}>
                      Post-Exploitation &amp; Reporting:
                    </span>{" "}
                    Linux privesc checklists, manual enumeration, Markdown/HTML deliverables
                  </li>
                  <li>
                    <span className="text-emerald-400 mr-2">▸</span>
                    <span className={`font-semibold ${textPalette.heading}`}>Red Team Basics:</span>{" "}
                    Payload creation, custom scripts, phishing simulations, WAF detection
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-xl">
                  ⚙️
                </div>
                    <h3 className="text-sm font-mono uppercase tracking-[0.22em] text-emerald-400">
                      Scripting &amp; Automation
                </h3>
              </div>
                  <ul className={`space-y-2 text-[11px] font-mono leading-relaxed ${textPalette.body}`}>
                    <li>
                      <span className="text-emerald-400 mr-2">▸</span>
                      <span className={`font-semibold ${textPalette.heading}`}>Languages:</span> Python, Bash, JavaScript, TypeScript, C++
                    </li>
                    <li>
                      <span className="text-emerald-400 mr-2">▸</span>
                      <span className={`font-semibold ${textPalette.heading}`}>
                        Automation &amp; APIs:
                      </span>{" "}
                      Python tooling, REST workflows, JSON handling
                    </li>
                    <li>
                      <span className="text-emerald-400 mr-2">▸</span>
                      <span className={`font-semibold ${textPalette.heading}`}>
                        Version Control &amp; Collaboration:
                      </span>{" "}
                      Git, GitHub, GitHub Actions, VS Code, Linux CLI
                    </li>
                  </ul>
            </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-xl">
                  ☁️
                </div>
                    <h3 className={`text-sm font-mono uppercase tracking-[0.22em] ${accentCyanText}`}>
                  Cloud &amp; Infrastructure
                </h3>
              </div>
                  <ul className={`space-y-2 text-[11px] font-mono leading-relaxed ${textPalette.body}`}>
                    <li>
                      <span className="text-cyan-400 mr-2">▸</span>
                      <span className={`font-semibold ${textPalette.heading}`}>Cloud Platforms:</span> AWS (SS, EC2), Azure basics, Linux servers
                    </li>
                    <li>
                      <span className="text-cyan-400 mr-2">▸</span>
                      <span className={`font-semibold ${textPalette.heading}`}>
                        Web Hosting &amp; Security:
                      </span>{" "}
                      NGINX builds, HTTPS config, security headers
                    </li>
                    <li>
                      <span className="text-cyan-400 mr-2">▸</span>
                      <span className={`font-semibold ${textPalette.heading}`}>Containers &amp; DevOps:</span>{" "}
                      Docker workflows, GitHub Actions (CI/CD), baseline hardening
                    </li>
                  </ul>
                </div>
                </div>
              </div>
            </div>

         
        </section>

        {/* Contact */}
        <section
          id="contact"
          className={`mt-2 flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8 animate-fade-in-up ${panelClasses.section}`}
        >
          <div className="space-y-2">
            <p className="font-mono text-[10px] text-slate-500">
              ./Contact.sh
            </p>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Contact
            </h2>
          </div>
          {/* Two-pane terminal-style contact layout */}
          <div className={`flex w-full flex-col gap-4 text-sm ${textPalette.body} sm:flex-row`}>
            {/* Left: contact info window */}
            <div
              className={`flex-1 rounded-xl border shadow-[0_0_30px_rgba(34,197,94,0.18)] ${panelClasses.glass}`}
            >
              <div
                className={`flex items-center justify-between border-b px-4 py-2 ${
                  theme === "dark" ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-[10px] text-slate-500">
                  ./contact_info.sh
                </span>
              </div>
              <div className="space-y-3 px-4 py-4 font-mono text-[11px] leading-relaxed">
                <p className="text-emerald-400">
                  $ cat contact_info.txt
                </p>
                <div className={`space-y-2 ${textPalette.body}`}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Email
                    </p>
                    <a
                      href="mailto:keneniasefa14@gmail.com"
                      className={`transition ${
                        theme === "dark"
                          ? "text-emerald-300 hover:text-emerald-200"
                          : "text-emerald-700 hover:text-emerald-500"
                      }`}
                    >
                      keneniasefa14@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      GitHub
                    </p>
                    <a
                      href="https://github.com/keneni0"
                      target="_blank"
                      rel="noreferrer"
                      className={`transition ${
                        theme === "dark"
                          ? "text-cyan-300 hover:text-cyan-200"
                          : "text-cyan-700 hover:text-cyan-500"
                      }`}
                    >
                      github.com/keneni0
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      LinkedIn
                    </p>
                    <a
                      href="https://linkedin.com/in/keneni-asefa-86a024369"
            target="_blank"
                      rel="noreferrer"
                      className={`transition ${
                        theme === "dark"
                          ? "text-cyan-300 hover:text-cyan-200"
                          : "text-cyan-700 hover:text-cyan-500"
                      }`}
                    >
                      linkedin.com/in/keneni-asefa-86a024369
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Phone
                    </p>
                    <p>+251924108449</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Location
                    </p>
                    <p>Adama, Ethiopia</p>
                  </div>
                </div>
                <p className="pt-2 text-[10px] text-slate-500">
                  # For sensitive information, please use encrypted channels.
                </p>
              </div>
            </div>

            {/* Right: message form window */}
            <div
              className={`flex-1 rounded-xl border shadow-[0_0_30px_rgba(34,197,94,0.18)] ${panelClasses.glass}`}
            >
              <div
                className={`flex items-center justify-between border-b px-4 py-2 ${
                  theme === "dark" ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-[10px] text-slate-500">
                  ./send_message.sh
                </span>
              </div>
              <form className="space-y-3 px-4 py-4 text-xs" onSubmit={handleContactSubmit}>
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`w-full rounded border px-3 py-2 text-xs outline-none focus:border-emerald-400 ${
                      theme === "dark"
                        ? "border-slate-700 bg-black/60 text-slate-100"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full rounded border px-3 py-2 text-xs outline-none focus:border-emerald-400 ${
                      theme === "dark"
                        ? "border-slate-700 bg-black/60 text-slate-100"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Enter your message"
                    className={`w-full resize-none rounded border px-3 py-2 text-xs outline-none focus:border-emerald-400 ${
                      theme === "dark"
                        ? "border-slate-700 bg-black/60 text-slate-100"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.8)] transition hover:bg-emerald-400"
                >
                  Send Message
                </button>
                {contactError && (
                  <p className="text-[10px] text-red-400">{contactError}</p>
                )}
                <p className="text-[9px] text-slate-500">
                  * This opens a pre-filled email to keneniasefa14@gmail.com in Gmail.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`mt-4 flex flex-col items-center justify-between gap-2 border-t py-4 text-[11px] text-slate-500 sm:flex-row ${
            theme === "dark" ? "border-slate-800/80" : "border-slate-200"
          }`}
        >
          <span>© 2025 Keneni Asefa. All rights reserved.</span>
        </footer>
        </div>
      </main>
  );
}
