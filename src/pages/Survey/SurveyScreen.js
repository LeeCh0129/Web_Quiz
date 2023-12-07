import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyScreen.css";
import { useNavigate } from "react-router-dom";

const API_KEY = "737fc88d439055fbc420c49a2612c2dd";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const genreIdToName = {
  12: "모험",
  14: "판타지",
  16: "만화",
  18: "드라마",
  27: "공포",
  28: "액션",
  35: "코미디",
  36: "역사",
  53: "스릴러",
  80: "범죄",
  878: "SF",
  9648: "미스터리",
  10402: "음악",
  10749: "로맨스",
  10751: "가족",
  10752: "전쟁",
};

const SurveyScreen = () => {
  const [movies, setMovies] = useState([]);
  const [genrePreferences, setGenrePreferences] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setMovies(response.data.results);
        initializeGenrePreferences(response.data.results);
      })
      .catch((error) => console.error("API 연결 에러:", error));
  }, []);

  // 영화 장르 선호도 초기값 설정
  const initializeGenrePreferences = (movies) => {
    const initialPreferences = {};
    movies.forEach((movie) => {
      movie.genre_ids.forEach((genreId) => {
        if (!initialPreferences[genreId]) {
          initialPreferences[genreId] = 0;
        }
      });
    });
    setGenrePreferences(initialPreferences);
  };

  const handlePreferenceChange = (genreId, value) => {
    setGenrePreferences({ ...genrePreferences, [genreId]: parseFloat(value) });
  };

  const findMovieForGenre = (genreId) => {
    return movies.find((movie) => movie.genre_ids.includes(parseInt(genreId)));
  };

  const submitPreferences = () => {
    localStorage.setItem("genrePreferences", JSON.stringify(genrePreferences));
    alert("선호도 조사를 완료했습니다!");
    navigate(-1);
  };

  return (
    <div>
      {Object.keys(genrePreferences).map((genreId) => {
        const movie = findMovieForGenre(genreId);
        const imageUrl = movie ? `${IMAGE_BASE_URL}${movie.poster_path}` : "";

        return (
          <div key={genreId} className="genre-container">
            <div id="gerneBox">
              {movie && (
                <img src={imageUrl} alt={movie.title} className="movie-image" />
              )}

              <div>
                <label className="preference-label">{`"${
                  genreIdToName[genreId] || "기타"
                }" 장르 선호도: `}</label>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={genrePreferences[genreId]}
                    onChange={(e) =>
                      handlePreferenceChange(genreId, e.target.value)
                    }
                  />
                  <span className="preference-value">
                    {genrePreferences[genreId].toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button id="save" onClick={submitPreferences}>
        선호도 저장
      </button>
    </div>
  );
};

export default SurveyScreen;
