import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { AppBar, Container, Fade, Tab, Tabs } from "@material-ui/core";
import "./css/App.css";
import { Code } from "./components/codeThing";
import { FrontPage } from "./components/FrontPage";
import { Projects } from "./components/Projects";
import { exampleProjects } from "./exampleCode";
import Axios from "axios";
import { ProjectInfo } from "./components/ProjectInfo";

const githubURL = "https://api.github.com/users/ianeli1/repos";

function App() {
  function handleChange(_e: any, newValue: number) {}
  const [currentId, setCurrentId] = useState(0);
  const [projectsList, setProjects] = useState(exampleProjects);
  const [loading, setLoading] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState(0);
  const frontPageRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const req = await Axios.get(githubURL);
      if (req.status == 200) {
        setProjects(req.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Couldn't get data from github");
      }
    })();
  }, []);

  return (
    <>
      <AppBar className="AppBar">
        <Tabs value={currentId} onChange={(_e, id) => void setCurrentId(id)}>
          <Tab
            label="@me"
            onClick={() => {
              frontPageRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <Tab
            label="@myProjects"
            onClick={() =>
              projectsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </Tabs>
      </AppBar>
      <Container className="AppContainer">
        <div
          className={`AppFront ${currentId == 0 ? "AppFront1" : "AppFront2"}`}
        >
          <div>
            <div className="Scroller">
              <div ref={frontPageRef}>
                <FrontPage ref={frontPageRef} />
              </div>

              <div ref={projectsRef}>
                <Projects
                  ref={projectsRef}
                  loading={loading}
                  projects={projectsList}
                  onProjectClick={(key) => void setCurrentProjectId(key)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AppBackground">
          <Fade in={currentId == 0}>
            <div>
              <Code />
            </div>
          </Fade>
          <Fade in={currentId == 1}>
            <div>
              <ProjectInfo project={projectsList[currentProjectId]} />
            </div>
          </Fade>
        </div>
      </Container>
    </>
  );
}

export default App;
