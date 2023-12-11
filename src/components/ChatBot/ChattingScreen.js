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

  const modalRef = useRef();

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
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addMessageToChatHistory(userInput, "User");
    const botResponse = await getBotResponse(userInput);
    addMessageToChatHistory(botResponse, "ChatGpt");
    setUserInput("");
  };

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
