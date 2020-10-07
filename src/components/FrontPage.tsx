import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { ReactComponent as Signature } from "../signature.svg";
import "../css/FrontPage.css";

const [firstName, lastName] = ["ian", "lastname"];

export function FrontPage() {
  return (
    <div className="FrontPage">
      <div className="FloatingBox1">
        <Signature className="Signature" />
        <h1>hola,</h1>
        <h2>my name is</h2>
        <h3>{firstName}</h3>
        <h4>{lastName}</h4>
      </div>
      <div className="FloatingBox2">
        <h1>{"() =>"}</h1>
        <Paper className="EpicBox" elevation={2}>
          <p>and i'm a:</p>
          <h1>Full-Stack developer*</h1>
          <h1>cool guy</h1>
          <h1>*in the making</h1>
        </Paper>
      </div>
    </div>
  );
}
