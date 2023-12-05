import React from "react";
import { useNavigate } from "react-router-dom";
import "./Board.css";

function Board({ boardText }) {
  const handleClick = () => {
    window.open("/type", "_blank");
  };

  return (
    <div id="firstDiv">
      <table id="firstTable">
        <tbody>
          <tr>
            <td id="leftBoard">
              <img
                src="/19team.png"
                width="120px"
                height="120px"
                alt="팀 대표사진입니다."
              />
            </td>
            <td id="middleBoard">
              <span id="boardText">{boardText}</span>
            </td>
            <td>
              <img
                id="rightBoard"
                onClick={handleClick}
                src="/movie.jpeg"
                width="120px"
                height="120px"
                alt="영화 퀴즈"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Board;
