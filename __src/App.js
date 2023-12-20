import React from "react";

import "./styles/style.css";
import "./styles/scss-style.scss";
import ChildComponent from "./ChildComponent.js";

export default function App() {
  return (
    <>
      <h1>I'm react app!</h1>
      <div className="css">Hello css!</div>
      <div className="scss">Hello scss!</div>
      <ChildComponent />
    </>
  );
}
