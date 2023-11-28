import React, { useState } from "react";
import Board from "../../components/Board";
import Member from "../../components/Member";
import ChattingScreen from "../../components/ChatBot/ChattingScreen";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
function HomeScreen() {
    const navigate = useNavigate();
  const [boardText, setBoardText] = useState("팀 세얼간이");
    const [showChatbot, setShowChatbot] = useState(false);

  const showText = (introduce, name, source) => {
    setBoardText(introduce);
    document.getElementById(name).style.backgroundImage = `url('${source}')`;
  };

  const hideText = (name, source) => {
    setBoardText("팀 세얼간이");
    document.getElementById(name).style.backgroundImage = `url('${source}')`;
  };
    const handleClick = () => {
        navigate("/quiz");
    };
    const handleChatbot = () => {
        setShowChatbot(true);
    };

    const closeChatbot = () => {
        setShowChatbot(false);
    };


  return (
    <div>
      <div id="top"></div>
      <Board boardText={boardText} />
      <div id="secondDiv">
        <table id="secondTable">
          <tbody>
            <tr>
              <Member
                name="minuk"
                onMouseOver={() =>
                  showText(
                    "소프트웨어응용학부 201904081 이민욱",
                    "minuk",
                    "/minuks.png"
                  )
                }
                onMouseOut={() => hideText("minuk", "/minuk.png")}
                displayName="이민욱"
              />
              <Member
                name="chanho"
                onMouseOver={() =>
                  showText(
                    "소프트웨어응용학부 201904090 이찬호",
                    "chanho",
                    "/chanhos.png"
                  )
                }
                onMouseOut={() => hideText("chanho", "/chanho.png")}
                displayName="이찬호"
              />
              <Member
                name="younghoon"
                onMouseOver={() =>
                  showText(
                      "ICT공학부 201904027 김영훈",
                    "younghoon",
                    "/younghoons.png"
                  )
                }
                onMouseOut={() => hideText("younghoon", "/younghoon.png")}
                displayName="김영훈"
              />
            </tr>
          </tbody>
        </table>
      </div>
      <div id="thirdDiv">
        <div id = "gamebuttonContainer">
            <button id="quizButton" onClick={handleClick}>
                <text>game start</text>
            </button>
        </div>
      </div>
        <div id="chatbotButton">
            <button id="chatbotButton" onClick={handleChatbot}>
            <img src="/chatbot.png" width="60px" height="60px" />
            </button>
        </div>
        <ChattingScreen show={showChatbot} handleClose={closeChatbot} />

    </div>
  );
}

export default HomeScreen;
