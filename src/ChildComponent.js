import React from "react";

import "./styles/child-style.scss";

import Plus from "./img/plus.svg";
import Ico from "./img/favicon.ico";
import Foo from "./img/foo.jpg";

export default function ChildComponent() {
  return (
    <>
      <div className="child-component">I'm ChildComponent!</div>
      <img className="child-component-image" src={Plus} alt="svg image" />
      <img className="child-component-image" src={Ico} alt="ico image" />
      <img className="child-component-image" src={Foo} alt="jpg immage" />
    </>
  );
}
