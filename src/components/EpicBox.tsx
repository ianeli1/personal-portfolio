import { Paper } from "@material-ui/core";
import React from "react";

interface EpicBoxProps {
  elements: string[];
  title?: string;
  onElementClick?: (key: number) => void;
}

export function EpicBox(props: EpicBoxProps) {
  return (
    <Paper
      className={`EpicBox ${props.onElementClick ? "EpicBoxClickable" : ""}`}
      elevation={2}
    >
      {props.title ? <p>{props.title}</p> : undefined}
      {props.elements.map((element, index) => (
        <h1
          key={index}
          onClick={() =>
            void (props.onElementClick && props.onElementClick(index))
          }
        >
          {element}
        </h1>
      ))}
    </Paper>
  );
}
