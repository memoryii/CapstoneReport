// src/App.jsx
import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { Helmet } from "react-helmet";
import "./App.css";

import Header from "./components/Header";
import styles from "./styles/Header.module.css"; // CSS module import

import Sec2 from "./components/Sec2";
import Sec4 from "./components/Sec4";
import Sec5 from "./components/Sec5";
import Sec7 from "./components/Sec7";
import Sec9 from "./components/Sec9";
import Sec10 from "./components/Sec10";

import bgCluster1 from "./images/cluster1.png";
import bgCluster2 from "./images/cluster2.png";

import bg01 from "./images/01.png";
import bg02 from "./images/02.png";
import bg03 from "./images/03.png";
import bg04 from "./images/04.png";
import bgEnding from "./images/ending.png";

import h2_bg from "./images/h2.png";
import h1_bg from "./images/h11.png";

// ─── 3. 테스트용 상수 데이터──────────────────────────────
const visual1 = {
  scores: {
    fixationTime: 8.2,
    fixationCount: 6.3,
    dispersion: 4.8,
    transitionFreq: 7.1,
    zoneDiversity: 10,
  },
};
const visual2 = {
  heatmap: [
    {
      x: 671.95,
      y: 372.6,
      r: 10,
    },
    {
      x: 603.4489795918367,
      y: 436.1020408163265,
      r: 27,
    },
    {
      x: 610.939393939394,
      y: 391.42424242424244,
      r: 18,
    },
    {
      x: 617.45,
      y: 290.5,
      r: 10,
    },
    {
      x: 597.5,
      y: 455.3125,
      r: 17,
    },
    {
      x: 1077.967741935484,
      y: 420.93548387096774,
      r: 16,
    },
    {
      x: 501.6857142857143,
      y: 565.5714285714286,
      r: 19,
    },
    {
      x: 1165,
      y: 419.962962962963,
      r: 30,
    },
    {
      x: 625.9666666666667,
      y: 282.56666666666666,
      r: 16,
    },
    {
      x: 623.0434782608696,
      y: 346.54347826086956,
      r: 25,
    },
    {
      x: 597.2592592592592,
      y: 306.55555555555554,
      r: 14,
    },
  ],
};

export default function App() {
  const [headerIndex, setHeaderIndex] =
    useState(2);
  const [visualData, setVisualData] =
    useState(null);
  const [loading, setLoading] =
    useState(true);

  const radarRef = useRef(null);

  // Header 종류별로 정의의
  const headerConfigs = {
    1: {
      bgImage: h1_bg,
      textBoxes: [
        {
          content: "white",
          className: "FlowerType",
          style: {
            bottom: "32%",
            left: "7%",
          },
        },
        {
          content: "Helleborus",
          className: "FlowerType",
          style: {
            bottom: "25%",
            left: "7%",
          },
        },
        {
          // 배열로 넘기면 자동으로 h2/mainLine/subLine 처리
          content: [
            "WANDERER",
            "Empathic Engagement",
          ],
          style: {
            top: "20%",
            left: "20%",
            /* h2 전체에 적용할 크기나 family는 CSS 모듈에 넣어도 되고,
               여기서 style로 개별 지정해도 됩니다. */
            borderRight:
              "1px solid #fff",
            paddingRight: "0.5rem",
            textAlign: "right",
          },
        },
        {
          // 이 박스만 JSX 노드로 넘겨줌
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
                Your Unconscious is
                “Deep Sync”
              </h3>
              <p
                className={
                  styles.descText
                }
              >
                짧은 순간, 당신의 시선이
                보여준 것은
                <strong>
                  깊은 감정적 반응과,
                  내면의 집중
                </strong>
                <br />
                <strong>
                  그리고 지속되는 응시
                </strong>
                였습니다. 그에 따라,
                당신의 내면에서 피어난
                진실
                <br />된 꽃은,{" "}
                <strong>
                  온화한 하얀빛의 고고한
                  헬레보어
                </strong>
                입니다.
                {/* 원하는 지점마다 <br/> 넣어서 줄바꿈 */}
              </p>
            </div>
          ),
          style: {
            bottom: "20%",
            left: "5%",
            right: "5%",
            /* 추가 포지셔닝 필요시 여기서 조정 */
            textAlign: "left",
          },
        },
      ],
    },

    2: {
      bgImage: h2_bg,
      textBoxes: [
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
        {
          // 배열로 넘기면 자동으로 h2/mainLine/subLine 처리
          content: [
            "SHAKER",
            "Cognitive Load",
          ],
          style: {
            bottom: "35%",
            left: "7%",
            /* h2 전체에 적용할 크기나 family는 CSS 모듈에 넣어도 되고,
               여기서 style로 개별 지정해도 됩니다. */
            borderLeft:
              "1px solid #fff",
            paddingLeft: "0.5rem",
            textAlign: "left",
          },
        },
        {
          // 이 박스만 JSX 노드로 넘겨줌
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
                Your Unconscious is
                “Scatter Mind”
              </h3>
              <p
                className={
                  styles.descText
                }
              >
                짧은 순간, 당신의 시선이
                보여준 것은
                <strong>
                  깊은 섬세한 반응과,
                  강렬한 에너지 그리고
                </strong>
                <br />
                <strong>
                  적극적인 변화가 있는
                  응시
                </strong>
                였습니다. 그에 따라,
                당신의 내면에서 피어난
                진실된 였습니다. 그에
                따라, 당신의 내면에서
                피어난 진실된
                <br />
                꽃은,{" "}
                <strong>
                  온화한 하얀빛의 활기찬
                  튤립
                </strong>
                입니다.
                {/* 원하는 지점마다 <br/> 넣어서 줄바꿈 */}
              </p>
            </div>
          ),
          style: {
            bottom: "20%",
            left: "5%",
            right: "5%",
            /* 추가 포지셔닝 필요시 여기서 조정 */
            textAlign: "center",
          },
        },
      ],
    },
    // ... 3 ~ 9 생략 ...
  };
  <Helmet>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
  </Helmet>;

  // Header 동적 변경
  useEffect(() => {
    fetch("/api/header-index")
      .then((res) => res.json())
      .then((data) => {
        const idx = data.index;
        if (idx >= 1 && idx <= 10)
          setHeaderIndex(idx);
      })
      .catch(() => {
        /* 오류 무시 */
      });
  }, []);

  useEffect(() => {
    fetch("/api/visual-data")
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "네트워크 에러"
          );
        return res.json();
      })
      .then((data) => {
        setVisualData(data);
      })
      .catch((err) => {
        console.error(
          "시각화 데이터 로드 실패",
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩 중…</div>;
  }
  if (!visualData) {
    return (
      <div>
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        config={
          headerConfigs[headerIndex]
        }
      />
      {/* Section 1: Short section with a single word */}
      <section className="sec1">
        Exploring the Unco
      </section>

      <Sec2
        headerLines={[
          "Internal data classification Type",
          "당신의 내면의 꽃을 피어낸 데이터 분석 값",
        ]}
        scores={visual1.scores}
      />

      <Sec4
        cells={[
          {
            title: "DATA ITEM",
            text: "무의식 유형 분석을 위한\n시선트래킹 데이터 항목",
            // inline override 가능 (옵션)
            titleSize: "14px",
            titleWeight: 400,
            textSize: "9px",
            textWeight: 300,
          },
          {
            title: "FIXATION COUNT",
            text: "전체 분석 구간에서 발생한 시선 고정의 총 개수",
          },
          {
            title: "DISPERSION",
            text: "시선이 화면 전체에 얼마나 넓게 분포",
          },
          {
            title: "Description",
            text: "영상 진행 중 무의식 내면을 반영하는 지표를 분석했습니다.",
          },
          {
            title:
              "TRANSITION\nFREQUENCY",
            text: "시선이 한 지점에서 다른 지점으로 자주 이동하는지",
          },
          {
            title: "FIXATION TIME",
            text: "한 지점에 머무르는 평균 시간",
          },
          {
            title: "ZONE DIVERSITY",
            text: "화면을 여러 영역으로 나누었을 때 다양한 영역을 탐색했는지",
          },
        ]}
      />

      <Sec5
        bgImage={bgCluster1}
        heatmap={visual2.heatmap}
        circleColor="rgba(189, 189, 189, 0.85)" // 원 색⋅투명도 변경 가능
        texts={[
          "Color Selection",
          "당신의 감정을 나타내는 색상은 불멸, 순수, 자존과 순결을 상징하는 “흰색“ 입니다",
        ]}
      />

      <Sec5
        bgImage={bgCluster2}
        heatmap={visual2.heatmap}
        circleColor="rgba(189, 189, 189, 0.85)" // 원 색⋅투명도 변경 가능
        texts={[
          "Color Selection",
          "당신의 감정을 나타내는 색상은 불멸, 순수, 자존과 순결을 상징하는 “흰색“ 입니다",
        ]}
      />

      {/* Section 1: Short section with a single word */}
      <section className="sec6">
        <span className="sec6__label">
          Unconscious Self
        </span>
      </section>

      <Sec7 title="BLOOMING DESIRE">
        관람객의{" "}
        <strong>
          시선에 따라 내면의 감정과
          욕망이
        </strong>
        <br />
        <strong>
          꽃의 형상으로 피어나는
        </strong>
        인터랙티브 미디어아트
        <br />
        당신이 무심코 머문 시선 하나가,
        <br />
        내면의 감정을 깨우고 하나의 꽃을
        피웁니다.
        <br />
        각기 다른 색과 형태로 피어나는
        꽃은
        <br />
        단순한 아름다움을 넘어,
        <br />{" "}
        <strong>
          우리 안에 자리한 자아의 진실과
          욕망을 상징
        </strong>
        합니다.
        <br />
        <br />
        마치 자신을 바라보다 물속으로
        빠져든 나르키소스처럼,
        <br />
        <strong>
          Blooming Desire
        </strong>{" "}
        는 당신에게 묻습니다.
        <br />
        <br />{" "}
        <strong>
          지금, 당신의 시선은 어떤
          감정을 담은 꽃으로 피어났나요?
        </strong>
      </Sec7>

      <Sec9
        bgImage={bg01}
        texts={[
          "01",
          "시선 기반 인터랙션",
          "관람객의 ‘시선’을 추적하여 시각적 요소에 직접 영향을 주는 인터랙티브 미디어아트 작품입니다.",
        ]}
      />
      <Sec9
        bgImage={bg02}
        texts={[
          "02",
          "욕망이라는 감정의 탐색",
          "작품은 자기애, 욕망, 진실된 내면을 중심으로 구성되며, 인간 내면의 복잡한 감정과 마주하게 합니다.",
        ]}
      />
      <Sec9
        bgImage={bg03}
        texts={[
          "03",
          "꽃을 통한 내면의 시각화",
          "작품은 자기애, 욕망, 진실된 내면을 중심으로 구성되며, 인간 내면의 복잡한 감정과 마주하게 합니다.",
        ]}
      />
      <Sec9
        bgImage={bg04}
        texts={[
          "04",
          "몰입적이고 시적인 영상 경험",
          "그리스 신화 나르키소스를 모티프로 한 서사적 전개와 상징적 이미지가 몰입감을 줍니다.",
        ]}
      />

      <div className="app-container">
        {/* …다른 섹션들… */}
        <Sec10
          bgImage={bgEnding}
          lines={[
            "Made by Team",
            "INFLORIA",
            "KIM YUJIN",
            "KIM DONGHEE",
            "KIM SARA",
            "PARK LEEKYUNG",
            "PARK GIJEONG",
          ]}
        />
      </div>
    </div>
  );
}
