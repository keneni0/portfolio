import type { Metadata } from "next";
import ProjectsIndexClient from "./ProjectsIndexClient";

export const metadata: Metadata = {
  title: "Projects | Keneni Asefa",
};

export default function ProjectsIndex() {
  return <ProjectsIndexClient />;
}