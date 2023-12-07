// src/pages/Results/ResultsPage.js
import React from "react";
import { calculateStatistics } from "../../utils/Statistics";
import GenrePreferenceChart from "../../components/GenrePreferenceChart";
import { genreIdToName } from "./SurveyScreen";

const ResultsPage = () => {
  const preferences =
    JSON.parse(localStorage.getItem("genrePreferences")) || {};
  const statistics = calculateStatistics(preferences, genreIdToName);

  return (
    <div>
      <h2>장르별 선호도 차트</h2>
      <GenrePreferenceChart
        preferences={preferences}
        genreIdToName={genreIdToName}
      />
      <h2>통계 정보</h2>
      <p>평균 선호도: {statistics.averagePreference.toFixed(1)}</p>
      <p>가장 선호하는 장르: {statistics.mostPreferredGenres.join(", ")}</p>
    </div>
  );
};

export default ResultsPage;
