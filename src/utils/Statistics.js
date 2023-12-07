export const calculateStatistics = (preferences, genreIdToName) => {
  const allPreferencesZero = Object.values(preferences).every(
    (score) => score === 0
  );

  if (allPreferencesZero) {
    return {
      mostPreferredGenres: ["선호도 조사 미참여 상태"],
    };
  }

  const maxPreference = Math.max(...Object.values(preferences));

  const mostPreferredGenres = Object.keys(preferences)
    .filter((genreId) => preferences[genreId] === maxPreference)
    .map((genreId) => genreIdToName[genreId] || "기타");

  return {
    mostPreferredGenres,
  };
};
