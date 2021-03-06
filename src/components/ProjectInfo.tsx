import { Backdrop, Fade, isWidthUp, Modal, withWidth } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import Axios from "axios";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../css/ProjectInfo.css";

interface ProjectInfoProps {
  project: GitHubProject;
  width: Breakpoint;
  open: boolean;
  onClose: () => void;
}

export function ProjectInfoRaw(props: ProjectInfoProps) {
  const { project } = props;
  const top = useRef<HTMLDivElement>(null);
  const [languages, setLanguages] = useState<{ [key: string]: number } | null>(
    project.language ? { [project.language]: 1 } : null
  );

  const isLg = isWidthUp("lg", props.width);

  const getLanguages = useCallback(async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    if (project.languages_url) {
      const req = await Axios.get(project.languages_url);
      if ((req.status = 200)) {
        setLanguages(req.data);
      } else {
        console.error("Couldn't get data from GitHub");
      }
    }
  }, [project.languages_url])  

  const content = useMemo(
    () => (
      <>
        <div ref={top} />
        <div className="ProjectInfoInner">
          <h1>name:</h1>
          <p>{project.name}</p>
          {project.homepage && (
            <>
              <h1>website:</h1>
              <p>
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                {Object.keys(languages).length === 1 && (
                  <a onClick={getLanguages} style={{ cursor: "pointer" }} href="/">
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
            date_created: {project.created_at.slice(0, 10)}
            <br />
            last_update: {getDateDif(project.updated_at)} days ago
          </p>
          <p>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              open on GitHub
            </a>
          </p>
        </div>
      </>
    ),
    [project, languages, getLanguages]
  );

  useEffect(() => {
    top.current?.scrollIntoView({ behavior: "smooth" });
    setLanguages(project.language ? { [project.language]: 1 } : null);
  }, [props.project.name, project.language]);

  


  function getDateDif(x: string) {
    const date1 = new Date(x);
    const today = new Date();
    return Math.abs(
      Math.floor((date1.getTime() - today.getTime()) / (1000 * 3600 * 24))
    );
  }

  return isLg ? (
    <div className="ProjectInfo">{content}</div>
  ) : (
    <Modal
      open={props.open}
      onClose={props.onClose}
      className="ProjectInfoModal"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={props.open}>
        <div>{content}</div>
      </Fade>
    </Modal>
  );
}

export const ProjectInfo = withWidth()(ProjectInfoRaw);
