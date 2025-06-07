// src/App.jsx
import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import "aos/dist/aos.css";
import AOS from "aos";

import { getHeaderConfig } from "./configs/headerConfigs";
//import Header from "./components/Header";
import styles from "./styles/Header.module.css"; // CSS module import
import Header from "./components/newHeader";

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
const visual3 = {
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
  ],
};

export default function App() {
  const [visualData, setVisualData] =
    useState(null);
  const [loading, setLoading] =
    useState(true);

  const radarRef = useRef(null);
  // 1. 색상별 설명 문구를 미리 매핑하는 객체를 정의
  const colorTextMap = {
    white: (
      <>
        당신의 시선은 &nbsp;
        <strong>흰색</strong> 꽃에
        머물렀습니다. &nbsp;
        <strong>
          순수함과 고요한 중심을 향한
          내면의 열망
        </strong>
        이 담겨 있습니다.
      </>
    ),
    blue: (
      <>
        당신의 시선은 &nbsp;
        <strong>파란</strong> 꽃을
        향했습니다. &nbsp;
        <strong>
          깊은 사색과 내면의 평온함
        </strong>
        이 느껴집니다.
      </>
    ),
    purple: (
      <>
        당신의 시선은 &nbsp;
        <strong>보라</strong> 꽃에
        이끌렸습니다. &nbsp;
        <strong>
          복합적인 감성과 이성 사이에서
          내면의 깊이
        </strong>
        를 탐색하고 있습니다.
      </>
    ),
    red: (
      <>
        당신은 &nbsp;
        <strong>빨간</strong> 꽃에
        시선을 멈췄습니다. &nbsp;
        <strong>
          도전과 성취를 향한 열정
        </strong>
        이 타오르고 있습니다.
      </>
    ),
    yellow: (
      <>
        당신은 &nbsp;
        <strong></strong>노란 꽃에
        시선을 두었습니다. &nbsp;
        <strong>
          희망과 긍정의 에너지가 새로운
          가능성
        </strong>
        을 비추고 있습니다.
      </>
    ),
    orange: (
      <>
        당신의 시선은 &nbsp;
        <strong>주황</strong> 꽃에
        머물렀습니다. &nbsp;
        <strong>
          애정과 진심 어린 교감을 통해
          내면의 안정
        </strong>
        을 추구하고 있습니다.
      </>
    ),
  };
  const keywordTextMap = {
    FullyBloomed: (
      <>
        자신을 표현하고 싶은 마음이
        강하게 피어났습니다.
        <br />
        <strong>
          주목받고 싶은 욕망, 사랑받고
          싶은 바람
        </strong>
        이 마음속에서 활짝 퍼지고
        있군요.
      </>
    ),
    PartiallyBloomed: (
      <>
        &nbsp;
        <strong>
          설렘과 불안 사이
        </strong>
        에서 망설이고 있는 당신. 하지만
        곧,&nbsp;
        <strong>
          당신만의 리듬으로 피어나기
          시작
        </strong>
        할 거예요.
      </>
    ),
    Budding: (
      <>
        당신은 아직 &nbsp;
        <strong>
          드러나지 않은 감정과 가능성을
          품고
        </strong>{" "}
        있습니다.
        <br />
        서서히 피어오를 당신만의
        이야기가 준비되고 있어요.
      </>
    ),
    Withered: (
      <>
        {" "}
        <strong>
          마음의 피로와 감정의 소진
        </strong>
        이 느껴집니다. 지금의 당신에게는
        &nbsp;
        <strong>
          잠시 쉬어갈 수 있는 위로
        </strong>
        가 필요해요.
      </>
    ),
    DetachedBloom: (
      <>
        당신은&nbsp;
        <strong>
          감정을 억누르며 현실적인
          선택을 중시
        </strong>
        하는 모습입니다.
        <br />
        <strong>
          차분하지만 깊이 있는 내면
        </strong>
        이 당신을 지탱하고 있어요.
      </>
    ),
  };

  // ─── !! 테스트용 데이터  !!
  const userFlower = "아네모네"; // 예시: 유저가 선택한 꽃의 유형
  const userColor = "white"; // 예시: 유저가 선택한 꽃의 색상
  const userType = "focalizer";
  const userKeyword = "DetachedBloom";

  const gap =
    "\u00A0\u00A0\u00A0\u00A0\u00A0";
  const slideText =
    "Exploring the Unconscious Self";
  const repeatedText = `${slideText}${gap}${slideText}`;

  // 타입과 색상에 맞는 헤더 설정 가져오기
  const headerConfig = getHeaderConfig(
    userFlower,
    userColor,
    userType,
    userKeyword
  );

  console.log(
    "App → headerConfig:",
    headerConfig
  );

  //Helmet 없으면 안됨! 비율 조정
  <Helmet>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
  </Helmet>;
  useEffect(() => {
    // AOS 옵션: once: true로 주면 한 번 화면에 나타난 후엔 애니메이션 재실행하지 않음
    AOS.init({
      duration: 600, // 애니메이션 동작 시간(ms)
      easing: "ease-out", // 애니메이션 이징 함수
      once: false, // true로 설정하면, 화면에 한 번 보인 후 스크롤 올렸다 내렸다 해도 재실행 안 함
      mirror: false, // false면 스크롤 위로 올라가면 애니메이션 초기 상태로 돌아가지 않음
    });
  }, []);

  /*
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


        // 2) 시각화 데이터 저장
        setVisualData({
          visual1: data.visual1.scores,
          visual2: data.visual2.heatmap,
          visual3: data.visual3.heatmap,
        });
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
*/
  return (
    <div className="app-container">
      <Header config={headerConfig} />

      {/* Section 1: Short section with a single word */}
      <section className="sec1">
        <div className="X_slide">
          {slideText}
        </div>
      </section>
      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec2
          headerLines={[
            "Internal data classification Type",
            "당신의 내면의 꽃을 피어낸 데이터 분석 값",
          ]}
          scores={visual1.scores}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec4
          cells={[
            {
              title: "DATA ITEM",
              text: "무의식 분석을 위한 시선트래킹 데이터 항목",
            },
            {
              text: (
                <>
                  영상을 진행하며,
                  당신의 무의식속 내면
                  <br />을 반영하는
                  지표인 시선을
                  분석했습니다.
                  <br />
                  저희가 분석한 시선
                  데이터의 항목은
                  <br />
                  다음과 같습니다.
                </>
              ),
            },
            {
              title: "FIXATION TIME",
              text: "한 지점에 머무르는 평균 시간",
            },
            {
              title: "FIXATION COUNT",
              text: "전체 분석 구간에서 발생한 시선 고정의 총 개수",
            },
            {
              title: "DISPERSION",
              text: "시선이 화면 전체에 얼마나 넓게 분포하였는지",
            },
            {
              title: "ZONE DIVERSITY",
              text: (
                <>
                  화면을 여러 영역으로
                  나누었을 때 얼마나
                  <br />
                  다양한 영역을
                  탐색했는지
                </>
              ),
            },
            {
              title:
                "TRANSITION FREQUENCY",
              text: "시선이 한 지점에서 다른 지점으로 얼마나 자주 이동하는지",
            },
          ]}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec5
          bgImage={bgCluster1}
          heatmap={visual2.heatmap}
          circleColor="rgba(189, 189, 189, 0.54)" // 원 색⋅투명도 변경 가능
          texts={[
            "Color Selection",
            colorTextMap[userColor] ||
              "당신의 시선이 향한 곳은..",
          ]}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec5
          bgImage={bgCluster2}
          heatmap={visual3.heatmap}
          circleColor="rgba(189, 189, 189, 0.85)" // 원 색⋅투명도 변경 가능
          texts={[
            "INNER KEYWORD",
            keywordTextMap[
              userKeyword
            ] ||
              "당신의 시선이 향한 곳은..",
          ]}
        />
      </div>

      {/* Section 1: Short section with a single word */}
      <section className="sec1">
        <div className="X_slide">
          {slideText}
        </div>
      </section>

      <Sec7 title="BLOOMING DESIRE">
        <div
          data-aos="fade-up"
          data-aos-delay="200"
        >
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
          당신이 무심코 머문 시선
          하나가,
          <br />
          내면의 감정을 깨우고 하나의
          꽃을 피웁니다.
          <br />
          각기 다른 색과 형태로 피어나는
          꽃은
          <br />
          단순한 아름다움을 넘어,
          <br />{" "}
          <strong>
            우리 안에 자리한 자아의
            진실과 욕망을 상징
          </strong>
          합니다.
        </div>
        <br />
        <div
          data-aos="fade-up"
          data-aos-delay="200"
        >
          마치 자신을 바라보다 물속으로
          빠져든 나르키소스처럼,
          <br />
          <strong>
            &lt;&lt;Blooming
            Desire&gt;&gt;
          </strong>{" "}
          는 당신에게 묻습니다.
        </div>
        <br />
        <div
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <strong>
            지금, 당신의 시선은 어떤
            감정을 담은 꽃으로
            피어났나요?
          </strong>
        </div>
      </Sec7>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec9
          bgImage={bg01}
          texts={[
            "01",
            "시선 기반 인터랙션",
            "관람객의 ‘시선’을 추적하여 시각적 요소에 직접 영향을 주는 인터랙티브 미디어아트 작품입니다.",
          ]}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec9
          bgImage={bg02}
          texts={[
            "02",
            "욕망이라는 감정의 탐색",
            "작품은 자기애, 욕망, 진실된 내면을 중심으로 구성되며, 인간 내면의 복잡한 감정과 마주하게 합니다.",
          ]}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec9
          bgImage={bg03}
          texts={[
            "03",
            "꽃을 통한 내면의 시각화",
            "작품은 자기애, 욕망, 진실된 내면을 중심으로 구성되며, 인간 내면의 복잡한 감정과 마주하게 합니다.",
          ]}
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Sec9
          bgImage={bg04}
          texts={[
            "04",
            "몰입적이고 시적인 영상 경험",
            "그리스 신화 나르키소스를 모티프로 한 서사적 전개와 상징적 이미지가 몰입감을 줍니다.",
          ]}
        />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="100"
      >
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
