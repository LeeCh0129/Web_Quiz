import React, { useState } from "react";
import "./App.css";

function App() {
  const [boardText, setBoardText] = useState("팀 세얼간이");

  const showText = (introduce, name, source) => {
    setBoardText(introduce);
    document.getElementById(name).style.backgroundImage = `url('${source}')`;
  };

  const hideText = (name, source) => {
    setBoardText("팀 세얼간이");
    document.getElementById(name).style.backgroundImage = `url('${source}')`;
  };

  return (
    <div>
      <div id="top"></div>
      <div id="firstDiv">
        <table id="firstTable">
          <tbody>
            <tr>
              <td id="leftBoard">
                <img
                  src="/19team.png"
                  width="120px"
                  height="120px"
                  alt="팀 대표사진입니다."
                />
              </td>
              <td id="middleBoard">
                <span id="boardText">{boardText}</span>
              </td>
              <td id="rightBoard">
                <a
                  href="https://web.kangnam.ac.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/kangnam.jpeg"
                    width="120px"
                    height="120px"
                    alt="강남대 로고"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="secondDiv">
        <table id="secondTable">
          <tbody>
            <tr>
              <td
                id="minuk"
                onMouseOver={() =>
                  showText(
                    "소프트웨어응용학부 201904081 이민욱",
                    "minuk",
                    "/minuks.png"
                  )
                }
                onMouseOut={() => hideText("minuk", "/minuk.png")}
              >
                <span className="name">이민욱</span>
              </td>
              <td
                id="chanho"
                onMouseOver={() =>
                  showText(
                    "소프트웨어응용학부 201904090 이찬호",
                    "chanho",
                    "/chanhos.png"
                  )
                }
                onMouseOut={() => hideText("chanho", "/chanho.png")}
              >
                <span className="name">이찬호</span>
              </td>
              <td
                id="younghoon"
                onMouseOver={() =>
                  showText(
                    "ICT공학부 201904027 김영훈",
                    "younghoon",
                    "/younghoons.png"
                  )
                }
                onMouseOut={() => hideText("younghoon", "/younghoon.png")}
              >
                <span className="name">김영훈</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="thirdDiv">
        <div></div>
      </div>
    </div>
  );
}

export default App;
