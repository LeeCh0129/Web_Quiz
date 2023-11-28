import React, { useState } from 'react';
import './Styles.css'; // 스타일시트 경로에 따라 수정하세요.

const ChattingScreen = ({ show, handleClose }) => {
    const [userInput, setUserInput] = useState('');
    const [botResponse, setBotResponse] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // API 키를 여기에 넣으세요. 'Bearer' 다음에 공백을 두고 키를 쓰세요.
                    'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                    prompt: `사용자가 좋아하는 분위기, 장르, 배우를 바탕으로 영화 추천: ${userInput}`,
                    max_tokens: 50
                })
            });
            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                setBotResponse(data.choices[0].text);
            } else {
                setBotResponse('응답을 받지 못했습니다.');
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
            setBotResponse('API 요청 중 오류가 발생했습니다.');
        }
    };


    if (!show) {
        return null;
    }

    return (
        <div className="chatting-modal">
            <div className="chatting-modal-content">
                <span className="chatting-close-button" onClick={handleClose}>&times;</span>
                <textarea value={userInput} onChange={handleInputChange} />
                <button onClick={handleSubmit}>영화 추천받기</button>
                <div>{botResponse}</div>
            </div>
        </div>
    );
};

export default ChattingScreen;
