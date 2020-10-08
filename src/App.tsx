import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { AppBar, Container, Divider, Fade, Tab, Tabs } from "@material-ui/core";
import "./css/App.css";
import { Code } from "./components/codeThing";
import { FrontPage } from "./components/FrontPage";
import { Projects } from "./components/Projects";
import { exampleProjects } from "./exampleCode";
import Axios from "axios";
import { ProjectInfo } from "./components/ProjectInfo";
import { AboutMe } from "./components/AboutMe";

const githubURL = "https://api.github.com/users/ianeli1/repos";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const [projectsList, setProjects] = useState(exampleProjects);
  const [loading, setLoading] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState(0);
  const frontPageRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const req = await Axios.get(githubURL);
      if (req.status === 200) {
        setProjects(req.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Couldn't get data from github");
      }
    })();
  }, []);

  const tabClasses = {
    root: "AppBarTab",
    wrapper: "AppBarTabWrapper",
    selected: "AppBarTabSelected",
  };

  return (
    <>
      <AppBar className="AppBar">
        <Tabs
          value={currentId}
          onChange={(_e, id) => void setCurrentId(id)}
          classes={{ indicator: "AppBarTabsIndicator" }}
        >
          <Tab
            label="home"
            classes={tabClasses}
            onClick={() => {
              frontPageRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <Tab
            label="myProjects"
            classes={tabClasses}
            onClick={() =>
              projectsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <Tab label="aboutMe" classes={tabClasses} />
        </Tabs>
      </AppBar>
      <Container className="AppContainer">
        <div className={`AppFront AppFront${currentId + 1}`}>
          <div>
            <div className="Scroller">
              <div ref={frontPageRef}>
                <FrontPage />
              </div>
              <Divider orientation="horizontal" style={{ height: 10 }} />
              <div ref={projectsRef}>
                <Projects
                  loading={loading}
                  projects={projectsList}
                  onProjectClick={(key) => void setCurrentProjectId(key)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AppBackground">
          <Fade in={currentId === 0} unmountOnExit>
            <div>
              <Code />
            </div>
          </Fade>
          <Fade in={currentId === 1}>
            <div>
              <ProjectInfo project={projectsList[currentProjectId]} />
            </div>
          </Fade>
          <Fade in={currentId === 2}>
            <div>
              <AboutMe />
            </div>
          </Fade>
        </div>
      </Container>
    </>
  );
}

export default App;
