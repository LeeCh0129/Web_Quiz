import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuizScreen.css";
import ChattingScreen from "../../components/ChatBot/ChattingScreen";
import { calculateStatistics } from "../../utils/Statistics";
import GenrePreferenceChart from "../../components/GenrePreferenceChart";
import { genreIdToName } from "../Survey/SurveyScreen";

const API_KEY = "737fc88d439055fbc420c49a2612c2dd";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const saveScore = (newScore) => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(newScore);
  localStorage.setItem("scores", JSON.stringify(scores));
};
const shortenOverview = (overview, maxLength = 100) => {
  if (overview.length <= maxLength) return overview;
  return `${overview.substring(0, maxLength)}....`;
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
    <div id="rankingContent">
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

const ResultsPage = () => {
  const preferences =
    JSON.parse(localStorage.getItem("genrePreferences")) || {};
  const statistics = calculateStatistics(preferences, genreIdToName);

  return (
    <div id="resultContainer">
      <p>
        가장 선호하는 장르 :{" "}
        <strong>{statistics.mostPreferredGenres.join(", ")}</strong>
      </p>
      <GenrePreferenceChart
        preferences={preferences}
        genreIdToName={genreIdToName}
      />
    </div>
  );
};

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const data = { ...location.state };
  const typeId = data.quizType;

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = async () => {
    await axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        const movies = data.results;
        // overview가 있는 영화만 필터링
        const moviesWithOverview = movies.filter(
          (movie) => movie.overview && movie.overview.trim()
        );
        let fetchedQuestions = [];

        if (typeId === "releaseDate") {
          fetchedQuestions = movies.map((movie, index) => {
            const options = shuffleArray(movies.map((m) => m.release_date))
              .filter((opt) => opt !== movie.release_date) // 현재 영화의 개봉일 제외
              .slice(0, 3);
            options.push(movie.release_date); // 정답 추가ase_date); // 정답 추가

            return {
              id: index,
              question: (
                <span>
                  영화 <strong>"{movie.title}"</strong>의 개봉일은 언제인가요?
                </span>
              ),
              answer: movie.release_date,
              posterPath: movie.poster_path,
              options: shuffleArray(options),
            };
          });
        } else if (typeId === "overview") {
          fetchedQuestions = moviesWithOverview.map((movie, index) => {
            const correctAnswer = shortenOverview(movie.overview);
            const wrongOptions = shuffleArray(
              moviesWithOverview.map((m) => shortenOverview(m.overview))
            )
              .filter((opt) => opt !== correctAnswer)
              .slice(0, 3);
            wrongOptions.push(correctAnswer);

            return {
              id: index,
              question: (
                <span>
                  영화 <strong>"{movie.title}"</strong>의 줄거리와 일치하는
                  것은?
                </span>
              ),
              answer: correctAnswer,
              posterPath: movie.poster_path,
              options: shuffleArray(wrongOptions),
            };
          });
        }

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
  useEffect(() => {
    fetchQuizQuestions();
  }, []);
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

  const handleSurveyClick = () => {
    navigate("/survey");
  };

  const quizType = typeId === "releaseDate" ? "개봉일" : "줄거리";

  return (
    <div id="wrapper">
      <div id="header">
        <h1 id="title">영화 {quizType} 퀴즈</h1>
        <p id="score">
          점수 : <strong>{score}</strong>
        </p>
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
                  <button id="answerBtn" onClick={() => handleAnswer(option)}>
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
      <ResultsPage />
      <button id="restartButton" onClick={resetGame}>
        퀴즈 재시작
      </button>
      <button id="chatBotButton" onClick={handleChattingScreen}>
        Chat Bot
      </button>
      <button id="surveyButton" onClick={handleSurveyClick}>
        선호도 조사
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
