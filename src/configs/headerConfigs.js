// src/configs/headerConfigs.js
import React from "react"; // JSX 사용을 위해 React 임포트 (React 17 이전 문법)
import styles from "../styles/Header.module.css";

// 1. 색상별 수식어/텍스트 매핑
const colorDescriptions = {
  white: "온화한 하얀빛",
  blue: "깊은 푸른빛",
  red: "타오르는 붉은 빛",
  purple: "신비로운 보라빛",
  yellow: "밝은 노란빛",
  orange: "따스한 주황빛",
};

// 2. 유형별 이미지 파일 이름 접두어 매핑 (예: '유영자' 유형은 이미지 파일명이 h1로 시작)
const imagePrefixMap = {
  헬레보어: "hellebore",
  튤립: "tulip",
  칼라릴리: "callalily",
  // 다른 유형도 추가 가능
};

// 3) type 별로 메인 라인(대문자), 서브 라인(영어 텍스트) 매핑
const typeTextMap = {
  focalizer: [
    "FOCALIZER",
    "Selective Attention",
  ],
  scanner: [
    "SCANNER",
    "Sensory Harmony",
  ],
  shaker: ["SHAKER", "Cognitive Load"],
  wanderer: [
    "WANDERER",
    "Emphatic Engagement",
  ],
  precisioner: [
    "PRECISIONER",
    "Feature Integration Theory",
  ],
  seeker: [
    "SEEKER",
    "Global Attention",
  ],
  Isolator: [
    "ISOLATOR",
    "Attention Deficit",
  ],
  Calmer: [
    "Calmer",
    "Cognitive Dissonance",
  ],

  Recaller: [
    "RECALLER",
    "Emotional Aversion",
  ],
  collector: [
    "COLLECTOR",
    "Reflecxive Processing",
  ],

  // 필요에 따라 type이 추가될 때마다 여기에 넣으면 됩니다.
};

// 4) type 별 “Your Unconscious is …” 뒤에 들어갈 제목(큰 따옴표 안) 매핑
const unconsciousTitleMap = {
  focalizer: "Focus Flame",
  scanner: "Wave Gazer",
  shaker: "Scatter Mind",
  wanderer: "Deep Sync",
  precisioner: "Pattern Hunter",
  seeker: "Glove Seeker",
  isolator: "Wind Blind",
  calmer: "Hesitant Loop",
  recaller: "Skip Trace",
  collector: "Snap Click",
};

// 5) type 별로 단락(설명) 안에서 쓰일 **첫 번째 굵은 문장**, **두 번째 굵은 문장** 매핑
const descriptionMap = {
  focalizer:
    "깊은 몰입력과 분석적인 사고, 그리고 고정되는 응시",
  scanner:
    "깊은 관찰적 반응과 열려있는 감각, 그리고 유동적인 응시",
  shaker:
    "깊은 섬세한 반응과 강렬한 에너지, 그리고 적극적인 변화가 있는 응시",
};

/**
 * getHeaderConfig
 * @param {string} flower  - 꽃 종류 이름(예: "튤립", "헬레보어", "라넌큘러스" 등)
 * @param {string} type    - type key (예: "focalizer", "scanner", "shaker")
 * @param {string} color   - 색상 키 (예: "white", "blue", "red" 등)
 * @returns {object|null}  - Header 컴포넌트가 사용할 config 객체, 정의되지 않은 경우 null 반환
 */

// 3. 헤더 설정 객체를 생성해 반환하는 함수
export function getHeaderConfig(
  flower,
  color,
  type
) {
  const prefix =
    imagePrefixMap[flower] || flower;
  const imageName = `${prefix}_${color}`; // 예: 'h1_white', 'h1_blue'
  const bgImage = require(`../images/flowers/${imageName}.png`); // 이미지 경로 (Webpack 사용 가정)

  const colorPhrase =
    colorDescriptions[color] || "";

  // 3) type이 정의된 맵에 있는지 확인
  const typeEntry = typeTextMap[type];
  if (!typeEntry) {
    console.warn(
      `[getHeaderConfig] 알 수 없는 type: ${type}`
    );
    return null;
  }

  // 4) type별로 메인/서브 라인 텍스트와 unconsciousTitle, description 문장 가져오기
  const [mainLineText, subLineText] =
    typeEntry;
  const unconsciousTitle =
    unconsciousTitleMap[type]; // “Shaker” 등
  const descText = descriptionMap[type]; // 이제 단일 문자열

  // 유형별로 다른 레이아웃과 텍스트 구성
  if (flower === "튤립") {
    // 색상에 따른 수식어 가져오기 (없으면 빈 문자열)

    return {
      bgImage, // 배경 이미지 (import된 이미지 또는 URL 경로)
      textBoxes: [
        // ─────────────────────────────────────────────────────
        // 1) 꽃 종류(한글 텍스트)
        // 간단 문자열 + 클래스만 지정할 땐, 'content'에 문자열을 넣고
        // 'className'에 CSS 모듈 key(FlowerType)를 줍니다.
        {
          content: "white",
          className: "FlowerType",
          style: {
            bottom: "23%",
            left: "7%",
          },
        },
        {
          content: "Tulip",
          className: "FlowerType",
          style: {
            bottom: "23%",
            right: "6%",
          },
        },
        // ─────────────────────────────────────────────────────
        // ─────────────────────────────────────────────────────
        // 3) 메인/서브 라인
        {
          // 배열로 넘기면 자동으로 h2/mainLine/subLine 처리
          content: [
            mainLineText,
            subLineText,
          ],
          style: {
            bottom: "35%",
            left: "7%",

            borderLeft:
              "1px solid #fff",
            paddingLeft: "0.5rem",
            textAlign: "left",
          },
        },
        // ─────────────────────────────────────────────────────
        // 4) JSX 노드로 이루어진 설명 텍스트 (색상 수식어를 삽입)
        {
          content: (
            <div
              className={
                styles.description
              }
            >
              <h3
                className={
                  styles.descTitle
                }
              >
                Your Unconscious is “
                {unconsciousTitle}”
              </h3>
              <p
                className={
                  styles.descText
                }
              >
                짧은 순간, 당신의 시선이
                보여준 것은{" "}
                <strong>
                  {descText}
                </strong>
                였습니다. 그에 따라,
                당신의 내면에서 피어난
                진실된 꽃은,
                <br />
                <strong>
                  {colorPhrase}의 활기찬
                  튤립
                </strong>
                입니다.
              </p>
            </div>
          ),
          style: {
            position: "absolute",
            bottom: "20%",
            left: "5%",
            right: "5%",
            textAlign: "center",
          },
        },
        // ─────────────────────────────────────────────────────
      ],
    };
  } else if (flower === "헬레보어") {
    // 색상에 따른 수식어 가져오기 (없으면 빈 문자열)

    return {
      bgImage, // 배경 이미지 (import된 이미지 또는 URL 경로)
      textBoxes: [
        // ─────────────────────────────────────────────────────
        // 1) 꽃 종류(한글 텍스트)
        // 간단 문자열 + 클래스만 지정할 땐, 'content'에 문자열을 넣고
        // 'className'에 CSS 모듈 key(FlowerType)를 줍니다.
        {
          content: "white",
          className: "FlowerType",
          style: {
            bottom: "23%",
            left: "7%",
          },
        },
        {
          content: "Tulip",
          className: "FlowerType",
          style: {
            bottom: "23%",
            right: "6%",
          },
        },
        // ─────────────────────────────────────────────────────
        // ─────────────────────────────────────────────────────
        // 3) 메인/서브 라인
        {
          // 배열로 넘기면 자동으로 h2/mainLine/subLine 처리
          content: [
            mainLineText,
            subLineText,
          ],
          style: {
            bottom: "35%",
            left: "7%",

            borderLeft:
              "1px solid #fff",
            paddingLeft: "0.5rem",
            textAlign: "left",
          },
        },
        // ─────────────────────────────────────────────────────
        // 4) JSX 노드로 이루어진 설명 텍스트 (색상 수식어를 삽입)
        {
          content: (
            <div
              className={
                styles.description
              }
            >
              <h3
                className={
                  styles.descTitle
                }
              >
                Your Unconscious is “
                {unconsciousTitle}”
              </h3>
              <p
                className={
                  styles.descText
                }
              >
                짧은 순간, 당신의 시선이
                보여준 것은{" "}
                <strong>
                  {descText}
                </strong>
                였습니다. 그에 따라,
                당신의 내면에서 피어난
                진실된 꽃은,
                <br />
                <strong>
                  {colorPhrase}의 활기찬
                  튤립
                </strong>
                입니다.
              </p>
            </div>
          ),
          style: {
            position: "absolute",
            bottom: "20%",
            left: "5%",
            right: "5%",
            textAlign: "center",
          },
        },
        // ─────────────────────────────────────────────────────
      ],
    };
  } else if (flower === "칼라릴리") {
    // 색상에 따른 수식어 가져오기 (없으면 빈 문자열)

    return {
      bgImage, // 배경 이미지 (import된 이미지 또는 URL 경로)
      textBoxes: [
        // ─────────────────────────────────────────────────────
        // 1) 꽃 종류(한글 텍스트)
        // 간단 문자열 + 클래스만 지정할 땐, 'content'에 문자열을 넣고
        // 'className'에 CSS 모듈 key(FlowerType)를 줍니다.
        {
          content: "white",
          className: "FlowerType",
          style: {
            bottom: "41%",
            left: "7%",
          },
        },
        {
          content: "Callalily",
          className: "FlowerType",
          style: {
            bottom: "33%",
            left: "7%",
          },
        },
        // ─────────────────────────────────────────────────────
        // ─────────────────────────────────────────────────────
        // 3) 메인/서브 라인
        {
          // 배열로 넘기면 자동으로 h2/mainLine/subLine 처리
          content: [
            mainLineText,
            subLineText,
          ],
          style: {
            bottom: "27%",
            right: "32%",

            borderRight:
              "1px solid #fff",
            paddingRight: "0.5rem",
            textAlign: "right",
          },
        },
        // ─────────────────────────────────────────────────────
        // 4) JSX 노드로 이루어진 설명 텍스트 (색상 수식어를 삽입)
        {
          content: (
            <div
              className={
                styles.description
              }
            >
              <h3
                className={
                  styles.descTitle
                }
              >
                Your Unconscious is “
                {unconsciousTitle}”
              </h3>
              <p
                className={
                  styles.descText
                }
              >
                짧은 순간, 당신의 시선이
                보여준 것은{" "}
                <strong>
                  {descText}
                </strong>
                였습니다. 그에 따라,
                당신의 내면에서 피어난
                진실된 꽃은,
                <br />
                <strong>
                  {colorPhrase}의 활기찬
                  튤립
                </strong>
                입니다.
              </p>
            </div>
          ),
          style: {
            position: "absolute",
            bottom: "20%",
            left: "5%",
            right: "5%",
            textAlign: "left",
          },
        },
        // ─────────────────────────────────────────────────────
      ],
    };
  } else if (flower === "칼라릴리") {
    // 색상에 따른 수식어 가져오기 (없으면 빈 문자열)

    return {
      bgImage, // 배경 이미지 (import된 이미지 또는 URL 경로)
      textBoxes: [
        // ─────────────────────────────────────────────────────
        // 1) 꽃 종류(한글 텍스트)
        // 간단 문자열 + 클래스만 지정할 땐, 'content'에 문자열을 넣고
        // 'className'에 CSS 모듈 key(FlowerType)를 줍니다.
        {
          content: "white",
          className: "FlowerType",
          style: {
            bottom: "41%",
            left: "7%",
          },
        },
        {
          content: "Callalily",
          className: "FlowerType",
          style: {
            bottom: "33%",
            left: "7%",
          },
        },
        // ─────────────────────────────────────────────────────
        // ─────────────────────────────────────────────────────
        // 3) 메인/서브 라인
        {
          // 배열로 넘기면 자동으로 h2/mainLine/subLine 처리
          content: [
            mainLineText,
            subLineText,
          ],
          style: {
            bottom: "27%",
            right: "32%",

            borderRight:
              "1px solid #fff",
            paddingRight: "0.5rem",
            textAlign: "right",
          },
        },
        // ─────────────────────────────────────────────────────
        // 4) JSX 노드로 이루어진 설명 텍스트 (색상 수식어를 삽입)
        {
          content: (
            <div
              className={
                styles.description
              }
            >
              <h3
                className={
                  styles.descTitle
                }
              >
                Your Unconscious is “
                {unconsciousTitle}”
              </h3>
              <p
                className={
                  styles.descText
                }
              >
                짧은 순간, 당신의 시선이
                보여준 것은{" "}
                <strong>
                  {descText}
                </strong>
                였습니다. 그에 따라,
                당신의 내면에서 피어난
                진실된 꽃은,
                <br />
                <strong>
                  {colorPhrase}의 활기찬
                  튤립
                </strong>
                입니다.
              </p>
            </div>
          ),
          style: {
            position: "absolute",
            bottom: "20%",
            left: "5%",
            right: "5%",
            textAlign: "left",
          },
        },
        // ─────────────────────────────────────────────────────
      ],
    };
  }
  // TODO: 다른 유형들도 유사한 형태로 분기하여 구성 반환
  // else if (flower === '다른유형') { ... }

  // 정의되지 않은 유형일 경우 기본값 혹은 null 반환
  return null;
}
