import React from "react";
import { EpicBox } from "./EpicBox";
import "../css/Projects.css";
interface ProjectsProps {
  loading: boolean;
  projects: GitHubProject[];
  ref?: React.RefObject<HTMLDivElement>;
  onProjectClick: (key: number) => void;
}

export function Projects(props: ProjectsProps) {
  return (
    <div className="Project" ref={props.ref}>
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
