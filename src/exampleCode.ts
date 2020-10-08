export default {
  0: {
    title: "App.tsx",
    content: `
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
            <div className={oops}>
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
              <Fade in={currentId === 0}>
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
    
    export default App;`,
  },
  1: {
    title: "index.tsx",
    content: `import React from "react";
    import ReactDOM from "react-dom";
    import "./index.css";
    import App from "./App";
    import { CssBaseline } from "@material-ui/core";
    
    ReactDOM.render(
      <React.StrictMode>
        <CssBaseline />
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );`,
  },
  2: {
    title: "codeSimulator.tsx",
    content: `import { AppBar, Tabs, Tab } from "@material-ui/core";
    import React, { useEffect, useState } from "react";
    import Highlight from "react-highlight";
    import exampleCode from "../exampleCode";
    import "../css/Code.css";
    import { ReactComponent as Logo } from "../ts.svg";
    
    const interval = 100;
    const timeout = 60000;
    const abc = "abcdefghijklmnoprstuvñ{};";
    
    function useSubscribe(fullText: string) {
      const [text, setText] = useState("");
      const [done, setDone] = useState(false);
      let currentId = 0;
    
      useEffect(() => {
        const length = fullText.length;
        setDone(false);
        const int = setInterval(async () => {
          if (currentId <= length) {
            if (Math.random() < 0.02) {
              setText(
                fullText.slice(0, currentId) +
                  abc[Math.floor(abc.length * Math.random())]
              );
              await new Promise((resolve) =>
                setTimeout(() => {
                  setText(fullText.slice(0, currentId));
                  setTimeout(() => void resolve(), interval * 1.5);
                }, interval * 1.5)
              );
            }
            currentId++;
            setText(fullText.slice(0, currentId));
          } else {
            setDone(true);
            clearInterval(int);
          }
        }, interval);
        setTimeout(() => clearInterval(int), timeout);
        return () => void clearInterval(int);
      }, [fullText]);
    
      return { text, done };
    }
    
    export function Code() {
      const [currId, setCurrId] = useState(0);
      const { text, done } = useSubscribe(exampleCode[currId].content);
    
      useEffect(() => {
        console.log("done changed to", done);
        if (done) {
          setCurrId((currId) => {
            return (currId + 1) % Object.keys(exampleCode).length;
          });
        }
      }, [done]);
    
      return (
        <>
          <AppBar className="CodeAppBar">
            <Tabs value={currId} classes={{ indicator: "CodeIndicator" }}>
              {Object.values(exampleCode).map(({ title, content }, index) => (
                <Tab
                  key={index}
                  label={title}
                  icon={<Logo className="CodeLogo" />}
                  classes={{ root: "CodeTab", wrapper: "CodeTabWrapper" }}
                />
              ))}
            </Tabs>
          </AppBar>
          <div className="CodeEditor">
            <Highlight>{text}</Highlight>
          </div>
        </>
      );
    }
    ;`,
  },
} as {
  [key: number]: {
    title: string;
    content: string;
  };
};

declare global {
  interface GitHubProject {
    name: string;
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    homepage: string;
    language: null | string;
    languages_url: string; //add a button to see all?
  }
}

export const exampleProjects: GitHubProject[] = [
  {
    name: "Is github down?",
    html_url: "",
    description:
      "looks like github is down, or my code broke. could you please send me an email? thanks",
    created_at: "2020-09-24T22:35:14Z",
    updated_at: "2020-09-24T22:35:14Z",
    homepage: "",
    language: "typescript",
    languages_url: "",
  },
];

export const [firstName, lastName] = ["Ian", "Elizondo"];
export const email = "ianelicha@gmail.com";
