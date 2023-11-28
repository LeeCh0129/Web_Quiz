import React, { useState } from "react";
import Board from "../components/Board";
import Member from "../components/Member";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  const [boardText, setBoardText] = useState("팀 세얼간이");

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
        <div>
            <button id="quizButton" onClick={handleClick}>
                <text>game start</text>
            </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
