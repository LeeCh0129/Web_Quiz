import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Styles.css";

const ChattingScreen = ({ show, handleClose }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      message:
        "Chat Bot : 안녕하세요! 영화에 대해 궁금한 것이 있으시면 언제든 물어보세요. 영화 전문가 세얼간이가 도와드리겠습니다.",
      sender: "ChatGpt",
    },
  ]);

  // 모달창 바깥을 클릭하면 모달창이 닫히도록 하는 코드
  const modalRef = useRef();

  // useEffect 훅으로 모달 바깥 클릭 이벤트 관리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  if (!show) {
    return null;
  }

  // 입력값이 바뀔 때마다 setUserInput을 통해 상태를 업데이트
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 채팅 양식 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    addMessageToChatHistory(userInput, "User");
    const botResponse = await getBotResponse(userInput);
    addMessageToChatHistory(botResponse, "ChatGpt");
    setUserInput("");
  };

  // OpenAI API를 사용하여 봇의 응답을 가져오는 함수
  const getBotResponse = async (input) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable movie expert. Answer the user’s movie-related questions accurately and in detail.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    };

    //api 요청 받아와서 오류 처리하기
    try {
      const response = await axios.post(apiUrl, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(
        "API 요청 오류:",
        error.response ? error.response.data : error
      );
      return error.response
        ? error.response.data.error.message
        : "응답을 가져오는중에 오류 발생";
    }
  };

  // 채팅 내역에 메시지를 추가하는 함수
  const addMessageToChatHistory = (message, sender) => {
    const formattedMessage = `${
      sender === "User" ? "User : " : "Chat Bot : "
    }${message}`;
    const backgroundColor = sender === "User" ? "white" : "slategrey";
    const fontColor = sender === "User" ? "black" : "white";
    setChatHistory((chatHistory) => [
      ...chatHistory,
      { message: formattedMessage, sender, backgroundColor, fontColor },
    ]);
  };

  return (
    <div className="chatting-modal">
      <div ref={modalRef} className="chatting-modal-content">
        <strong>Chat Bot</strong>
        <div className="chat-box">
          {chatHistory.map((msg, index) => (
            <div
              id="msgBox"
              key={index}
              className={`message ${msg.sender}`}
              style={{
                backgroundColor: msg.backgroundColor,
                color: msg.fontColor,
              }}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="message-input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="궁금하신 점을 물어보세요!"
            />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChattingScreen;
