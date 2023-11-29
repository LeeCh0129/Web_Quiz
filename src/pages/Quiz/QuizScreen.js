import React, { useState, useEffect } from "react";

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
  const scores = getScores().sort((a, b) => b - a);

  // 순위 부여
  const rankedScores = scores.map((score, index) => {
    const rank = index + 1;
    return { rank, score };
  });

  return (
    <div>
      <h2>랭킹</h2>
      <ul>
        {rankedScores.map((scoreData) => (
          <li key={scoreData.rank}>
            {scoreData.rank}위: {scoreData.score} 점
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        let movies = data.results;
        let options = shuffleArray(movies.map((movie) => movie.title)).slice(
          0,
          3
        );

        let fetchedQuestions = movies.map((movie, index) => {
          return {
            id: index,
            question: `이 영화의 제목은 무엇일까요?`,
            answer: movie.title,
            posterPath: movie.poster_path,
            options: shuffleArray([movie.title, ...options]),
          };
        });

        setQuestions(shuffleArray(fetchedQuestions));
      });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (option) => {
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert(
          `퀴즈 완료! 당신의 점수는 ${score + 1}/${questions.length}입니다.`
        );
        saveScore(score + 1);
        resetGame();
      }
    } else {
      alert(
        `틀렸습니다. 당신은 총${score}문제의 정답을 맞추셨습니다. 대단하시네요!`
      );
      saveScore(score);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    fetchQuestions();
  };

  return (
    <div>
      <h1>영화 퀴즈</h1>
      <p>현재 점수: {score}</p>
      {questions.length > 0 && (
        <div id={"quizContainer"}>
          <img
            style={{ height: "300px" }}
            src={`${IMAGE_BASE_URL}${questions[currentQuestionIndex].posterPath}`}
            alt="영화 포스터"
          />
          <p>{questions[currentQuestionIndex].question}</p>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      <button onClick={resetGame}>다시 게임하기</button>
      <Ranking />
    </div>
  );
};

export default QuizScreen;
