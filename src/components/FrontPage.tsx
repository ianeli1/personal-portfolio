import React, { useMemo } from "react";
import { ReactComponent as Signature } from "../signature.svg";
import "../css/FrontPage.css";
import { EpicBox } from "./EpicBox";
import { firstName, lastName } from "../exampleCode";
import { isWidthUp, withWidth } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

interface FrontPageProps {
  width: Breakpoint;
}

export function FrontPageRaw(props: FrontPageProps) {
  const isLg = isWidthUp("lg", props.width);
  const descriptionBox = useMemo(
    () => (
      <EpicBox
        title="and i'm a"
        elements={["Full-Stack developer*", "cool guy", "*in the making"]}
      />
    ),
    []
  );
  return useMemo(
    () => (
      <div className={isLg ? "FrontPage" : "FrontPageMobile"}>
        <div
          className={`FloatingBox${
            isWidthUp("lg", props.width) ? "1" : "Mobile"
          }`}
        >
          <h1>hola,</h1>
          <h2>my name is</h2>

          <h3>{firstName.toLowerCase()}</h3>
          <h4>{lastName.toLowerCase()}</h4>

          <Signature className={isLg ? "Signature" : "SignatureMobile"} />
        </div>
        {isLg ? (
          <div className="FloatingBox2">
            <h1>{"() =>"}</h1>
            {descriptionBox}
          </div>
        ) : (
          descriptionBox
        )}
      </div>
    ),
    [isLg, descriptionBox, props.width]
  );
}

export const FrontPage = withWidth()(FrontPageRaw);
