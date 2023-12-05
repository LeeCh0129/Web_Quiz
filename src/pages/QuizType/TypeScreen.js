import React from "react";
import { useNavigate } from "react-router-dom";
import "./TypeScreen.css";
const TypeScreen = () => {
  const navigate = useNavigate();

  const handleQuiz = (type) => {
    navigate("/quiz", { state: { quizType: type } });
  };

  return (
    <div className="type-selection-container">
      <div className="button-container">
        <button
          className="typeButton"
          onClick={() => handleQuiz("releaseDate")}
        >
          <strong>영화 개봉일 퀴즈</strong>
        </button>
        <button className="typeButton" onClick={() => handleQuiz("overview")}>
          <strong>영화 줄거리 퀴즈</strong>
        </button>
      </div>
    </div>
  );
};

export default TypeScreen;
