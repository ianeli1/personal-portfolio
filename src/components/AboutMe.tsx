import React from "react";
import { email, firstName, lastName } from "../exampleCode";
import "../css/AboutMe.css";

export function AboutMe() {
  return (
    <div className="AboutMe">
      <div className="AboutMeInner">
        <h1>who am i?</h1>
        <p>
          Hello there! My name is {`${firstName} ${lastName}`} and I am an
          aspiring developer from Costa Rica, currently teaching myself the
          basics. I'm always trying to learn new technologies and overcome any
          difficulties that may arise.
        </p>
        <h1>what skills do i have?</h1>
        <p>
          - HTML/CSS
          <br />- Javascript/Typescript/Python/C++
          <br />- React
          <br />- Node.JS
          <br />- Serverless applications (Firebase)
          <br />- SQL
          <br />- Algorithm design
        </p>
        <h1>how can you contact me?</h1>
        <p style={{ userSelect: "text" }}>
          {`You can contact me via email (${email}), i'll be happy to chat.`}
        </p>
      </div>
    </div>
  );
}
