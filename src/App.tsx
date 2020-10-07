import React, { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import "./css/App.css";
import { Code } from "./components/codeThing";
import { FrontPage } from "./components/FrontPage";

function App() {
  function handleChange(_e: any, newValue: number) {}
  const [currentId, setCurrentId] = useState(0);
  return (
    <>
      <AppBar className="AppBar">
        <Tabs value={currentId} onChange={(_e, id) => void setCurrentId(id)}>
          <Tab label="@me" onClick={() => console.log("idk")} />
          <Tab label="@myProjects" />
        </Tabs>
      </AppBar>
      <Container className="AppContainer">
        <div
          className={`AppFront ${currentId == 0 ? "AppFront1" : "AppFront2"}`}
        >
          <div>
            <FrontPage />
          </div>
        </div>
        <div className="AppBackground">
          <Code />
        </div>
      </Container>
    </>
  );
}

export default App;
