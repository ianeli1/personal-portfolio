import React from "react";
import { EpicBox } from "./EpicBox";
import "../css/Projects.css";
import { isWidthUp, withWidth } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
interface ProjectsProps {
  loading: boolean;
  projects: GitHubProject[];
  onProjectClick: (key: number) => void;
  width: Breakpoint;
}

export function ProjectsRaw(props: ProjectsProps) {
  const isLg = isWidthUp("lg", props.width);
  return (
    <div className="Project" style={{ maxWidth: isLg ? "70%" : undefined }}>
      <div className="ProjectTitleBox">
        <h1 className={props.loading ? "Loading" : undefined}>my projects,</h1>
      </div>
      <div className="ProjectsMain">
        <EpicBox
          title="from my github"
          elements={props.projects.map((x) => x.name)}
          onElementClick={(key) => void props.onProjectClick(key)}
        />
      </div>
    </div>
  );
}

export const Projects = withWidth()(ProjectsRaw);
