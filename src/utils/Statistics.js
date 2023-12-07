export const calculateStatistics = (preferences, genreIdToName) => {
  const totalScore = Object.values(preferences).reduce(
    (sum, score) => sum + score,
    0
  );
  const averagePreference = totalScore / Object.keys(preferences).length;

  // 가장 높은 선호도
  const maxPreference = Math.max(...Object.values(preferences));

  // 가장 높은 선호도를 가진 모든 장르
  const mostPreferredGenres = Object.keys(preferences)
    .filter((genreId) => preferences[genreId] === maxPreference)
    .map((genreId) => genreIdToName[genreId] || "기타");

  return {
    averagePreference,
    mostPreferredGenres,
  };
};
