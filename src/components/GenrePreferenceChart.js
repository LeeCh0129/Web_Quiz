import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GenrePreferenceChart = ({ preferences, genreIdToName }) => {
  const data = Object.keys(preferences).map((genreId) => ({
    name: genreIdToName[genreId] || "기타",
    선호도: preferences[genreId],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="선호도" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenrePreferenceChart;
