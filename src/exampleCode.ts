export default {
  0: {
    title: "App.tsx",
    content: `
        import React from "react";
        import logo from "./logo.svg";
        import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
        import "./App.css";
        import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
        
            </>
          );
        }
        
        export default App;
        `,
  },
  1: {
    title: "index.tsx",
    content: `
        import React from "react";
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
    title: "pain.tsx",
    content: `
    import Rea
    a
    a
    a
    aaslknfslanglasnglkasnglkasnflansln
    a
    a
    a
    
    a
    atById("root")
        );`,
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
    name: "SimpleChat",
    html_url: "",
    description: "For simple chatting!",
    created_at: "2020-09-24T22:35:14Z",
    updated_at: "2020-09-24T22:35:14Z",
    homepage: "",
    language: "typescript",
    languages_url: "",
  },
];
