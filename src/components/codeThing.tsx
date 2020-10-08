import { AppBar, Tabs, Tab } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
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
    setTimeout(() => setDone(true), timeout);
    return () => void clearInterval(int);
  }, [fullText]);

  return { text, done };
}

export function Code() {
  const [currId, setCurrId] = useState(0);
  const { text, done } = useSubscribe(exampleCode[currId].content);
  const tabClass = { root: "CodeTab", wrapper: "CodeTabWrapper" };
  const tsLogo = <Logo className="CodeLogo" />;
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
      {useMemo(
        () => (
          <AppBar className="CodeAppBar">
            <Tabs value={currId} classes={{ indicator: "CodeIndicator" }}>
              {Object.values(exampleCode).map(({ title, content }, index) => (
                <Tab
                  key={index}
                  label={title}
                  icon={tsLogo}
                  classes={tabClass}
                />
              ))}
            </Tabs>
          </AppBar>
        ),
        [currId]
      )}

      <div className="CodeEditor">
        <Highlight>{text}</Highlight>
      </div>
    </>
  );
}
