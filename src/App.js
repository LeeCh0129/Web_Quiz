import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/HomeScreen";
import QuizScreen from "./pages/Quiz/QuizScreen";
import GenreSurvey from "./pages/Survey/SurveyScreen";
import ChattingScreen from "./components/ChatBot/ChattingScreen";
import TypeScreen from "./pages/QuizType/TypeScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/survey" element={<GenreSurvey />} />
        <Route path="/type" element={<TypeScreen />} />
        <Route path="/chatting" element={<ChattingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
