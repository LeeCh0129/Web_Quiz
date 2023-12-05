import React from "react";
import { useNavigate } from "react-router-dom";
import "./TypeScreen.css";

const TypeScreen = () => {
  const navigate = useNavigate();

  const handleQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="type-selection-container">
      <div className="button-container">
        <button onClick={handleQuiz}>영화 개봉일 퀴즈</button>
        <button onClick={handleQuiz}>영화 줄거리 퀴즈</button>
      </div>
    </div>
  );
};

export default TypeScreen;
