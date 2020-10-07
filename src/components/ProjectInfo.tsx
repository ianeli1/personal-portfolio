import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../css/ProjectInfo.css";

interface ProjectInfoProps {
  project: GitHubProject;
}

export function ProjectInfo(props: ProjectInfoProps) {
  const { project } = props;
  const top = useRef<HTMLDivElement>(null);
  const [languages, setLanguages] = useState<{ [key: string]: number } | null>(
    project.language ? { [project.language]: 1 } : null
  );
  useEffect(() => {
    top.current?.scrollIntoView({ behavior: "smooth" });
    setLanguages(project.language ? { [project.language]: 1 } : null);
  }, [props.project.name]);

  async function getLanguages() {
    if (project.languages_url) {
      const req = await Axios.get(project.languages_url);
      if ((req.status = 200)) {
        setLanguages(req.data);
      } else {
        console.error("Couldn't get data from GitHub");
      }
    }
  }

  function getDateDif(x: string) {
    const date1 = new Date(x);
    const today = new Date();
    return Math.abs(
      Math.floor((date1.getTime() - today.getTime()) / (1000 * 3600 * 24))
    );
  }

  return (
    <div className="ProjectInfo">
      <div ref={top} />
      <div className="ProjectInfoInner">
        <h1>name:</h1>
        <p>{project.name}</p>
        {project.homepage && (
          <>
            <h1>website:</h1>
            <p>
              <a href={project.homepage} target="_blank">
                {project.homepage}
              </a>
            </p>
          </>
        )}
        {project.description && (
          <>
            <h1>description:</h1>
            <p>{project.description}</p>
          </>
        )}
        <h1>languages:</h1>
        <p>
          {languages ? (
            <>
              {Object.keys(languages)
                .reduce((acc: string, cv) => `${acc} ${cv},`, "")
                .slice(1, -1)}
              {Object.keys(languages).length == 1 && (
                <a onClick={getLanguages} style={{ cursor: "pointer" }}>
                  , ...
                </a>
              )}
            </>
          ) : (
            "no info provided"
          )}
        </p>
        <h1>other_info:</h1>
        <p>
          {`date_created: ${project.created_at.slice(0, 10)}
last_update: ${getDateDif(project.updated_at)} days ago`}
        </p>
        <p>
          <a href={project.html_url} target="_blank">
            open on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
