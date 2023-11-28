import React, { useState, useEffect } from 'react';

const API_KEY = '737fc88d439055fbc420c49a2612c2dd'; // API 키
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // 이미지 기본 URL

const QuizScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                let movies = data.results;
                let options = shuffleArray(movies.map(movie => movie.title)).slice(0, 3);

                let fetchedQuestions = movies.map((movie, index) => {
                    return {
                        id: index,
                        question: `이 영화의 제목은 무엇일까요?`,
                        answer: movie.title,
                        posterPath: movie.poster_path,
                        options: shuffleArray([movie.title, ...options])
                    };
                });

                setQuestions(shuffleArray(fetchedQuestions));
            });
    };
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 배열 구조 분해 할당을 사용하여 요소 교환
        }
        return array;
    };

    const handleAnswer = (option) => {
        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                alert(`퀴즈 완료! 당신의 점수는 ${score + 1}/${questions.length}입니다.`);
                resetGame();
            }
        } else {
            alert(`틀렸습니다. 당신은 ${score}문제를 맞추셨습니다. 대단하시네요!`);
            resetGame();
        }
    };

    const resetGame = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        fetchQuestions(); // 새로운 퀴즈를 로드합니다.
    };

    return (
        <div>
            <h1>영화 퀴즈</h1>
            {questions.length > 0 && (
                <div id={"quizContainer"}>
                    <img     style={{ height: '300px' }}
                             src={`${IMAGE_BASE_URL}${questions[currentQuestionIndex].posterPath}`} alt="영화 포스터" />
                    <p>{questions[currentQuestionIndex].question}</p>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
            <button onClick={resetGame}>다시 게임하기</button>
        </div>
    );
};

export default QuizScreen;
