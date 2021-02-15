import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import {
  AppBar,
  Container,
  Divider,
  Fade,
  Hidden,
  isWidthUp,
  Tab,
  Tabs,
  withWidth,
} from "@material-ui/core";
import "./css/App.css";
import { FrontPage } from "./components/FrontPage";
import { Projects } from "./components/Projects";
import { exampleProjects } from "./exampleCode";
import Axios from "axios";
import { ProjectInfo } from "./components/ProjectInfo";
import { AboutMe } from "./components/AboutMe";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

const githubURL = "https://api.github.com/users/ianeli1/repos";
const Code = lazy(() => import("./components/codeThing"));

interface AppProps {
  width: Breakpoint;
}

function App(props: AppProps) {
  const [currentId, setCurrentId] = useState(0);
  const [projectsList, setProjects] = useState(exampleProjects);
  const [loading, setLoading] = useState(true);
  const [projectModal, setProjectModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(0);
  const frontPageRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);

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

  const isLg = isWidthUp("lg", props.width);

  return (
    <>
      {useMemo(
        () => (
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
              <Tab
                label="aboutMe"
                classes={tabClasses}
                onClick={() =>
                  aboutMeRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </Tabs>
          </AppBar>
        ),
        [currentId, tabClasses]
      )}
      <Container className="AppContainer">
        <div className={`AppFront AppFront${isLg ? currentId + 1 : "Mobile"}`}>
          {useMemo(
            () => (
              <div>
                <div className="Scroller">
                  <div
                    ref={frontPageRef}
                    style={{ overflowY: isLg ? "hidden" : undefined }}
                  >
                    <FrontPage />
                  </div>
                  <Divider orientation="horizontal" style={{ height: 10 }} />
                  <div ref={projectsRef}>
                    <Projects
                      loading={loading}
                      projects={projectsList}
                      onProjectClick={(key) => {
                        setCurrentProjectId(key);
                        setProjectModal(true);
                      }}
                    />
                  </div>
                  <Hidden lgUp>
                    <div ref={aboutMeRef} className="EpicDivIdkIRanOutOfNames">
                      <AboutMe />
                    </div>
                  </Hidden>
                </div>
              </div>
            ),
            [loading, isLg, projectsList]
          )}
        </div>
        <div className="AppBackground">
          <Hidden mdDown>
            <Suspense fallback={null}>
              <Fade in={currentId === 0} unmountOnExit>
                <div>
                  <Code />
                </div>
              </Fade>
            </Suspense>
            <Fade in={currentId === 2}>
              <div>
                <AboutMe />
              </div>
            </Fade>
          </Hidden>
          <Fade in={currentId === 1}>
            <div>
              <ProjectInfo
                project={projectsList[currentProjectId]}
                open={projectModal}
                onClose={() => setProjectModal(false)}
              />
            </div>
          </Fade>
        </div>
      </Container>
    </>
  );
}

export default withWidth()(App);
