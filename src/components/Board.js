import React from "react";
import "./Board.css";

function Board({ boardText }) {
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
            <td id="rightBoard">
              <a
                href="https://web.kangnam.ac.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/kangnam.jpeg"
                  width="120px"
                  height="120px"
                  alt="강남대 로고"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Board;
