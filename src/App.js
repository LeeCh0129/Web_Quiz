import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/HomeScreen";
import QuizScreen from "./pages/Quiz/QuizScreen";
import GenreSurvey from "./pages/Survey/SurveyScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/survey" element={<GenreSurvey />} />
      </Routes>
    </Router>
  );
}

export default App;
