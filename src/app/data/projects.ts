export type ProjectStatus = "Completed" | "In-progress" | "Planned";

export type ProjectItem = {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  github: string;
  category: string;
  status: ProjectStatus;
  progress: number; // 0–100
  updated: string;
};

export const projects: ProjectItem[] = [
  {
    name: "CodexHub",
    slug: "codexhub",
    description:
      "A collaborative space where developers can share, browse, and discuss code snippets in a clean, opinionated interface.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React", "MongoDB"],
    github: "https://github.com/Keneni0/CodexHub",
    category: "Web Apps",
    status: "In-progress",
    progress: 80,
    updated: "2025-09-01",
  },
  {
    name: "fmovies",
    slug: "fmovies",
    description:
      "A front-end clone of a popular movie platform, focused on smooth navigation, search, and responsive UI for streaming catalogs.",
    tech: ["React", "TypeScript", "TMDB API"],
    github: "https://github.com/Keneni14/fmovies",
    category: "Frontend",
    status: "Completed",
    progress: 100,
    updated: "2025-08-10",
  },
  {
    name: "Trackizer",
    slug: "trackizer",
    description:
      "A dashboard-style app for tracking subscriptions, spend, and renewal dates to keep recurring costs under control.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/Keneni14/Trackizer",
    category: "Productivity",
    status: "Completed",
    progress: 100,
    updated: "2025-07-18",
  },
  {
    name: "data_exfiltration_simulator",
    slug: "data-exfiltration-simulator",
    description:
      "A controlled environment for modeling and testing data exfiltration paths, built to help teams validate their detection and response.",
    tech: ["Python", "Linux"],
    github: "https://github.com/Keneni14/data_exfiltration_simulator",
    category: "Security Tools",
    status: "In-progress",
    progress: 70,
    updated: "2025-09-05",
  },
  {
    name: "deepfake-detection",
    slug: "deepfake-detection",
    description:
      "An AI-driven toolchain for spotting manipulated media using computer vision and deep learning techniques.",
    tech: ["Python", "PyTorch", "Computer Vision"],
    github: "https://github.com/Keneni14/deepfake-detection",
    category: "AI / ML",
    status: "Planned",
    progress: 40,
    updated: "2025-08-25",
  },
];

