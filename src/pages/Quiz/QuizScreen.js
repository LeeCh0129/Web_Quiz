import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./QuizScreen.css";
import ChattingScreen from "../../components/ChatBot/ChattingScreen";

const API_KEY = "737fc88d439055fbc420c49a2612c2dd";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const saveScore = (newScore) => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(newScore);
  localStorage.setItem("scores", JSON.stringify(scores));
};

const getScores = () => {
  return JSON.parse(localStorage.getItem("scores")) || [];
};

const Ranking = () => {
  const scores = getScores()
    .sort((a, b) => b - a)
    .slice(0, 10);

  // 순위 부여
  const rankedScores = scores.map((score, index) => {
    const rank = index + 1;
    return { rank, score };
  });

  return (
    <div>
      <h3>랭킹</h3>
      <ul>
        {rankedScores.map((scoreData) => (
          <li key={scoreData.rank}>
            {scoreData.rank}위 : {scoreData.score} 점
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = () => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        const movies = data.results;
        const options = shuffleArray(movies.map((movie) => movie.title)).slice(
          0,
          3
        );

        const fetchedQuestions = movies.map((movie, index) => {
          return {
            id: index,
            question: `이 영화의 제목은 무엇일까요?`,
            answer: movie.title,
            posterPath: movie.poster_path,
            options: shuffleArray([movie.title, ...options]),
          };
        });

        setQuizQuestions(shuffleArray(fetchedQuestions));
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert(
          `퀴즈 완료! 당신의 점수는 ${score + 1}/${quizQuestions.length}입니다.`
        );
        saveScore(score + 1);
        resetGame();
      }
    } else {
      alert(
        `틀렸습니다. 당신은 총 ${score}문제의 정답을 맞추셨습니다. 대단하시네요!`
      );
      saveScore(score);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    fetchQuizQuestions();
  };

  const handleChattingScreen = () => {
    setShowChatbot(true);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div id="wrapper">
      <div id="header">
        <h1 id="title">영화 퀴즈</h1>
        <p id="score">점수 : {score}</p>
      </div>
      {quizQuestions.length > 0 && (
        <div id="quizContainer">
          <div id="imgContainer">
            <img
              id="img"
              src={`${IMAGE_BASE_URL}${quizQuestions[currentQuestionIndex].posterPath}`}
              alt="영화 포스터"
            />
          </div>
          <div id="answerContainer">
            <span>{quizQuestions[currentQuestionIndex].question}</span>
            {quizQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <div key={index} className="option">
                  <button onClick={() => handleAnswer(option)}>
                    {index + 1}. {option}
                  </button>
                </div>
              )
            )}
          </div>
          <div id="rankingContainer">
            <Ranking />
          </div>
        </div>
      )}
      <button id="restartButton" onClick={resetGame}>
        퀴즈 재시작
      </button>
      <button id="floatingButton" onClick={handleChattingScreen}>
        Chat Bot
      </button>
      <div>
        {showChatbot && (
          <ChattingScreen show={showChatbot} handleClose={closeChatbot} />
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
