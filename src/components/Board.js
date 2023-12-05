import React from "react";
import { useNavigate } from "react-router-dom";
import "./Board.css";

function Board({ boardText }) {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    navigate("/type");
  };

  const handleSurveyClick = () => {
    navigate("/survey");
  };

  return (
    <div id="firstDiv">
      <table id="firstTable">
        <tbody>
          <tr>
            <td>
              <img
                id="leftBoard"
                onClick={handleSurveyClick}
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
                onClick={handleQuizClick}
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
