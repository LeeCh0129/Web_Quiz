import React from "react";
import "./Member.css";

function Member({ name, onMouseOver, onMouseOut, displayName }) {
  return (
    <td id={name} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <span className="name">{displayName}</span>
    </td>
  );
}

export default Member;
