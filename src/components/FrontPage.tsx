import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { ReactComponent as Signature } from "../signature.svg";
import "../css/FrontPage.css";
import { EpicBox } from "./EpicBox";

const [firstName, lastName] = ["ian", "lastname"];

interface FrontPageProps {
  ref?: React.RefObject<HTMLDivElement>;
}

export function FrontPage(props: FrontPageProps) {
  return (
    <div className="FrontPage" ref={props.ref}>
      <div className="FloatingBox1">
        <Signature className="Signature" />
        <h1>hola,</h1>
        <h2>my name is</h2>
        <h3>{firstName}</h3>
        <h4>{lastName}</h4>
      </div>
      <div className="FloatingBox2">
        <h1>{"() =>"}</h1>
        <EpicBox
          title="and i'm a"
          elements={["Full-Stack developer*", "cool guy", "*in the making"]}
        />
      </div>
    </div>
  );
}
