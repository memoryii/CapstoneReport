import React, {
  useEffect,
  useRef,
} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";

import image2 from "./images/image2.png";
import image10 from "./images/image10.png";
import image11 from "./images/image11.png";
import image12 from "./images/image12.png";
import image from "./images/image.svg";
import image3 from "./images/image3.png"; // Imported image3 for overlap-8 background

import polygon2 from "./polygons/Polygon2.svg";
import polygon3 from "./polygons/Polygon3.svg";
import polygon4 from "./polygons/Polygon4.svg";
import polygon5 from "./polygons/Polygon5.svg";

import vector1 from "./vectors/Vector1.svg";
import vector3 from "./vectors/Vector3.svg";
import vector4 from "./vectors/Vector4.svg";
import vector5 from "./vectors/Vector5.svg";
import vector6 from "./vectors/Vector6.svg";
import vector7 from "./vectors/Vector7.svg";
import vector8 from "./vectors/Vector8.svg";
import vector9 from "./vectors/Vector9.svg";
import vector11 from "./vectors/Vector11.svg";
import vector12 from "./vectors/Vector12.svg";
import vector13 from "./vectors/Vector13.svg";
import vector14 from "./vectors/Vector14.svg";
import vector15 from "./vectors/Vector15.svg";
import vector16 from "./vectors/Vector16.svg";
import vector17 from "./vectors/Vector17.svg";

export const Iphone = () => {
  // Define visual data objects (visual1, visual2, visual3)
  const visual1 = {
    scores: {
      fixationTime: 8.2,
      fixationCount: 6.3,
      dispersion: 4.8,
      transitionFreq: 7.1,
      zoneDiversity: 10.0,
    },
  };

  const visual2 = {
    heatmap: [
      { x: 1477, y: 466, r: 30 },
      { x: 1474, y: 462, r: 10 },
      { x: 1469, y: 460, r: 18 },
      { x: 1466, y: 457, r: 15 },
      { x: 1462, y: 455, r: 38 },
    ],
  };
  const visual3 = {
    heatmap: [
      { x: 100, y: 100 },
      { x: 105, y: 105 },
      { x: 110, y: 110 },
    ],
  };

  // Canvas refs for radar chart and heatmap overlays
  const radarCanvasRef = useRef(null);
  const cluster2CanvasRef =
    useRef(null);
  const cluster3CanvasRef =
    useRef(null);

  // Draw on canvases after component mounts
  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
    //scroll 업데이트
    AOS.refresh();

    /** Radar Chart Drawing **/
    const radarCanvas =
      radarCanvasRef.current;
    if (radarCanvas) {
      const ctx =
        radarCanvas.getContext("2d");
      const {
        fixationCount,
        dispersion,
        zoneDiversity,
        transitionFreq,
        fixationTime,
      } = visual1.scores;
      const values = [
        fixationCount,
        dispersion,
        zoneDiversity,
        transitionFreq,
        fixationTime,
      ];
      const n = values.length; // 5 points
      const centerX =
        radarCanvas.width / 2;
      const centerY =
        radarCanvas.height / 2;
      const radius =
        0.9 *
        Math.min(centerX, centerY); // use 90% of half-size as radius
      // Draw radar shape
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle =
          -Math.PI / 2 +
          (2 * Math.PI * i) / n; // start at -90° and distribute evenly
        const value = values[i] / 10; // assuming max score is 10
        const x =
          centerX +
          radius *
            value *
            Math.cos(angle);
        const y =
          centerY +
          radius *
            value *
            Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      // Style the radar shape (fill and stroke)
      ctx.fillStyle =
        "rgba(217, 217, 217, 0.4)"; // semi-transparent gray fill
      ctx.strokeStyle =
        "rgba(217, 217, 217, 0.8)"; // slightly more opaque stroke
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    }

    /** Image2 Heatmap Cluster Drawing **/
    const cluster2Canvas =
      cluster2CanvasRef.current;
    if (cluster2Canvas) {
      const ctx2 =
        cluster2Canvas.getContext("2d");
      ctx2.fillStyle =
        "rgba(217, 217, 217, 0.2)"; // translucent gray

      // Calculate scaling factors (assuming original coords are on 1920×1080 space)
      const scaleX =
        cluster2Canvas.width / 1920;
      const scaleY =
        cluster2Canvas.height / 1080;

      visual2.heatmap.forEach(
        (point) => {
          // 1) 좌표 스케일링
          const cx = point.x * scaleX;
          const cy = point.y * scaleY;
          // 2) 반지름 r도 스케일링 (가로·세로 스케일 평균 사용)
          const r =
            point.r *
            ((scaleX + scaleY) / 2);

          // 3) 원 그리기
          ctx2.beginPath();
          ctx2.arc(
            cx,
            cy,
            r,
            0,
            2 * Math.PI
          );
          ctx2.fill();
        }
      );
    }

    /** Image3 Heatmap Cluster Drawing **/
    const cluster3Canvas =
      cluster3CanvasRef.current;
    if (cluster3Canvas) {
      const ctx3 =
        cluster3Canvas.getContext("2d");
      ctx3.fillStyle =
        "rgba(217, 217, 217, 0.2)";
      visual3.heatmap.forEach(
        (point) => {
          ctx3.beginPath();
          ctx3.arc(
            point.x,
            point.y,
            20,
            0,
            2 * Math.PI
          );
          ctx3.fill();
        }
      );
    }
  }, []); // run once on mount

  return (
    <div className="iphone">
      <div className="div">
        <div
          className="overlap"
          data-aos="fade-up"
        >
          <div className="auto-layout">
            <div className="text-wrapper">
              꽃을 통한 내면의 시각화
            </div>
          </div>
          <div className="div-wrapper">
            <p className="p">
              다양한 형태와 색을 지닌
              꽃으로 관람자의 내면
              감정과 자아 이미지를
              은유적으로 표현합니다.
            </p>
          </div>
          <div className="text-wrapper-2">
            03
          </div>
        </div>

        <div className="overlap-group">
          <div className="auto-layout-2">
            <div
              className="text-wrapper"
              data-aos="fade-up"
            >
              욕망이라는 감정의 탐색
            </div>
          </div>
          <div className="auto-layout-3">
            <p
              className="text-wrapper-3"
              data-aos="fade-up"
            >
              작품은 자기애, 욕망,
              진실된 내면을 중심으로
              구성되며, 인간 내면의
              복잡한 감정과 마주하게
              합니다.
            </p>
          </div>
          <div
            className="text-wrapper-4"
            data-aos="fade-up"
          >
            02
          </div>
        </div>

        <div className="overlap-group-2">
          <div className="overlap-2">
            <div className="helleborus">
              {" "}
              Helleborus
            </div>
            <div className="text-wrapper-5">
              white
            </div>
          </div>
          <div className="text-wrapper-6">
            DEEP SYNC
          </div>
          <div className="text-wrapper-7">
            INFLORIA
          </div>
          <div className="auto-layout-4">
            <div className="div-2">
              Empathic Engagement
            </div>
          </div>
          <p className="text-wrapper-8">
            Your Unconscious is “Deep
            Sync"
          </p>
          <p className="div-3">
            <span className="span">
              짧은 순간, 당신의 시선이
              보여준 것은{" "}
            </span>
            <span className="text-wrapper-9">
              깊은 감정적 반응과, 내면의
              집중 그리고 지속되는 응시
            </span>
            <span className="span">
              였습니다. 그에 따라,
              당신의 내면에서 피어난
              진실된 꽃은,
            </span>
            <span className="text-wrapper-10">
              &nbsp;
            </span>
            <span className="text-wrapper-9">
              온화한 하얀빛의 고고한
              헬레보어
            </span>
            <span className="span">
              입니다.
            </span>
          </p>
          <div className="overlap-3">
            <div className="text-wrapper-11">
              Result Report
            </div>
          </div>
          <img
            className="vector"
            alt="Vector"
            src={vector11}
          />
        </div>

        {/* ↓↓↓ overlap-4 (IMAGE2 + 컬러/데이터 설명) 섹션 전체 교체 ↓↓↓ */}
        <div className="overlap-4">
          <div className="overlap-5">
            <img
              className="image"
              alt="Image12"
              src={image12}
            />
            <img
              className="img"
              alt="Image11"
              src={image11}
            />
            <img
              className="image-2"
              alt="Image10"
              src={image10}
            />
            <img
              className="image-3"
              alt="Visual2"
              src={image2}
            />
            {/* 시선 클러스터 캔버스 */}
            <canvas
              width={393}
              height={226}
              style={{
                position: "absolute",
                top: "224px",
                left: 0,
                pointerEvents: "none",
              }}
              ref={cluster2CanvasRef}
            />
          </div>

          {/* COLOR SELECTION 설명 */}
          <div className="text-wrapper-12">
            COLOR SELECTION
          </div>
          <div className="auto-layout-5">
            <p className="div-2">
              <span className="text-wrapper-13">
                당신의 감정을 나타내는
                색상은
              </span>
              <span className="text-wrapper-14">
                {" "}
                불멸, 순수, 자존과
                순결을 상징하는 “흰색“{" "}
              </span>
              <span className="text-wrapper-13">
                입니다
              </span>
            </p>
          </div>

          {/* 각 지표 라벨 + 설명 */}
          <p className="text-wrapper-15">
            시선이 화면 전체에
            <br />
            얼마나 넓게 분포
          </p>
          <div className="text-wrapper-16">
            ZONE DIVERSITY
          </div>
          <p className="text-wrapper-17">
            화면을 여러 구역으로
            <br />
            나누었을 때 얼마나 다양한
            영역을 탐색했는지
          </p>
          <div className="text-wrapper-18">
            TRANSITION FREQUENCY
          </div>
          <p className="text-wrapper-19">
            시선이 한 지점에서
            <br />
            다른 지점으로 얼마나
            <br />
            자주 이동하는지
          </p>
          <div className="text-wrapper-20">
            FIXATION COUNT
          </div>
          <p className="text-wrapper-21">
            전체 분석 구간에서 발생한
            <br />
            시선 고정의 총 개수
          </p>

          {/* 수직·수평 가이드 벡터 (원본 그대로 유지) */}
          <img
            className="vector-2"
            alt="Guide"
            src={vector15}
          />
          <img
            className="vector-3"
            alt="Guide"
            src={vector1}
          />
          <img
            className="vector-4"
            alt="Guide"
            src={image}
          />
          <img
            className="vector-5"
            alt="Guide"
            src={vector3}
          />
          <img
            className="vector-6"
            alt="Guide"
            src={vector4}
          />
          <img
            className="vector-7"
            alt="Guide"
            src={vector6}
          />
          <img
            className="vector-8"
            alt="Guide"
            src={vector5}
          />
          <img
            className="vector-9"
            alt="Guide"
            src={vector7}
          />

          {/* DATA ITEM 헤더 */}
          <div className="text-wrapper-22">
            DATA ITEM
          </div>
          <div className="auto-layout-6">
            <p className="div-2">
              무의식 유형 분석을 위한
              시선트래킹 데이터 항목
            </p>
          </div>

          {/* ← 여기 auto-layout-7 부분입니다 */}
          <div className="auto-layout-7">
            <p className="text-wrapper-23">
              영상을 진행하며, 당신의
              무의식속 내면을 반영하는
              지표인 시선을
              분석했습니다. 저희가
              분석한 시선 데이터의
              항목은 다음과 같습니다.
            </p>
          </div>

          {/* 이어지는 지표들 */}
          <div className="text-wrapper-24">
            FIXATION TIME
          </div>
          <p className="text-wrapper-25">
            한 지점에 머무르는
            <br />
            평균 시간
          </p>

          <div className="text-wrapper-26">
            DISPERSION
          </div>
          <img
            className="vector-10"
            alt="Divider"
            src={vector13}
          />
        </div>
        {/* ↑↑↑ overlap-4 섹션 교체 끝 ↑↑↑ */}

        {/* overlap-6: 팀 정보 섹션 */}
        <div
          className="overlap-6"
          data-aos="fade-up"
        >
          <div className="text-wrapper-27">
            INFLORIA
          </div>

          <div className="overlap-7">
            <div className="text-wrapper-28">
              Made by Team
            </div>
          </div>

          <p className="KIM-YUJIN-KIM">
            KIM YUJIN
            <br />
            KIM DONGHEE
            <br />
            KIM SARA
            <br />
            PARK LEEKYUNG
            <br />
            PARK KIGEONG
          </p>
        </div>

        <div className="text-wrapper-30">
          Internal data classification
          type
        </div>
        <div className="auto-layout-10">
          <p className="text-wrapper-31">
            당신의 내면의 꽃을 피어낸
            데이터 분석 값
          </p>
        </div>
        <div className="text-wrapper-32">
          Exploring the Unconscious Self
        </div>
        <div className="text-wrapper-33">
          Exploring the Unconscious Self
        </div>
        <div className="text-wrapper-34">
          FIXATION TIME
        </div>
        <div className="text-wrapper-35">
          고정 시간
        </div>
        <div className="text-wrapper-36">
          ZONE DIVERSITY
        </div>
        <div className="text-wrapper-37">
          관찰 영역 다양성
        </div>
        <div className="text-wrapper-38">
          DISPERSION
        </div>
        <div className="text-wrapper-39">
          시선 분산도
        </div>
        <div className="text-wrapper-40">
          TRANSITION FREQUENCY
        </div>
        <div className="text-wrapper-41">
          전환 빈도
        </div>
        <div className="text-wrapper-42">
          FIXATION COUNT
        </div>
        <div className="text-wrapper-43">
          고정 횟수
        </div>

        <div className="overlap-8">
          {/* Inserted image3 as img tag (replacing CSS background) */}
          <img
            className="image-4" /* optional class if needed for styling */
            alt="Image3"
            src={image3}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
          {/* Canvas overlay for image3 heatmap clusters */}
          <canvas
            data-aos="fade-up"
            width={335}
            height={212}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            ref={cluster3CanvasRef}
          />
          {/* Removed static ellipse-20 to ellipse-32 here */}
          <div
            className="text-wrapper-29"
            data-aos="fade-up"
          >
            INNER KEYWORD
          </div>
          <div
            className="auto-layout-8"
            data-aos="fade-up"
          >
            <p className="div-4">
              <span className="text-wrapper-13">
                당신은 지금 자신을
                드러내고 싶은{" "}
              </span>
              <span className="text-wrapper-14">
                강한 표현 욕구와
                사랑받고자 하는 마음이
                피어오른 상태
              </span>
              <span className="text-wrapper-13">
                입니다.
              </span>
            </p>
          </div>
          <div
            className="auto-layout-9"
            data-aos="fade-up"
          >
            <p className="div-4">
              활짝 피어난 꽃 - 자신감,
              애정 결핍, 사회적 표현
            </p>
          </div>
        </div>

        <div className="text-wrapper-30">
          Internal data classification
          type
        </div>
        <div className="auto-layout-10">
          <p className="text-wrapper-31">
            당신의 내면의 꽃을 피어낸
            데이터 분석 값
          </p>
        </div>
        <div className="text-wrapper-32">
          Exploring the Unconscious Self
        </div>
        <div className="text-wrapper-33">
          Exploring the Unconscious Self
        </div>
        <div className="text-wrapper-34">
          FIXATION TIME
        </div>
        <div className="text-wrapper-35">
          고정 시간
        </div>
        <div className="text-wrapper-36">
          ZONE DIVERSITY
        </div>
        <div className="text-wrapper-37">
          관찰 영역 다양성
        </div>
        <div className="text-wrapper-38">
          DISPERSION
        </div>
        <div className="text-wrapper-39">
          시선 분산도
        </div>
        <div className="text-wrapper-40">
          TRANSITION FREQUENCY
        </div>
        <div className="text-wrapper-41">
          전환 빈도
        </div>
        <div className="text-wrapper-42">
          FIXATION COUNT
        </div>
        <div className="text-wrapper-43">
          고정 횟수
        </div>

        <div className="overlap-9">
          {/* Canvas for dynamic radar chart (replaces static polygons) */}
          <canvas
            width={217}
            height={206}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            ref={radarCanvasRef}
          />
          {/* Removed <img className="polygon"... polygon2-5 and vector-11 here */}
        </div>

        <img
          className="vector-12"
          alt="Vector"
          src={vector12}
        />
        <img
          className="vector-13"
          alt="Vector"
          src={vector16}
        />
        {/*<img className="vector-14" alt="Vector" src={vector10} />*/}
        <img
          className="vector-15"
          alt="Vector"
          src={vector9}
        />
        <img
          className="vector-16"
          alt="Vector"
          src={vector17}
        />

        <div
          className="overlap-10"
          data-aos="fade-up"
        >
          <div className="auto-layout-11">
            <div className="text-wrapper-44">
              시선 기반 인터랙션
            </div>
          </div>
          <div className="auto-layout-12">
            <p className="text-wrapper-45">
              관람객의 ‘시선’을 추적하여
              시각적 요소에 직접 영향을
              주는 인터랙티브 미디어아트
              작품입니다.
            </p>
          </div>
          <div className="text-wrapper-46">
            01
          </div>
        </div>

        <div className="overlap-11">
          <div className="auto-layout-13">
            <div className="text-wrapper-47">
              몰입적이고 시적인 영상
              경험
            </div>
          </div>
          <div className="auto-layout-14">
            <p className="p">
              그리스 신화 나르키소스를
              모티프로 한 서사적 전개와
              상징적 이미지가 몰입감을
              줍니다.
            </p>
          </div>
          <div className="text-wrapper-48">
            04
          </div>
        </div>

        <div className="text-wrapper-49">
          BLOOMING DESIRE
        </div>
        <img
          className="vector-17"
          alt="Vector"
          src={vector14}
        />
        <div className="flexcontainer">
          <p className="text">
            <span className="text-wrapper-50">
              {" "}
              관람객의{" "}
            </span>
            <span className="text-wrapper-51">
              시선에 따라 내면의 감정과
              욕망이 <br />
            </span>
          </p>
          <p className="text">
            <span className="text-wrapper-51">
              꽃의 형상으로 피어나는
            </span>

            <span className="text-wrapper-50">
              {" "}
              인터랙티브 미디어아트
            </span>
          </p>
        </div>

        <div className="flexcontainer-2">
          <p className="text">
            <span className="text-wrapper-50">
              당신이 무심코 머문 시선
              하나가, <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-50">
              내면의 감정을 깨우고
              하나의 꽃을 피웁니다.
              <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-50">
              각기 다른 색과 형태로
              피어나는 꽃은 <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-50">
              단순한 아름다움을 넘어,{" "}
              <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-51">
              우리 안에 자리한 자아의
              진실과 욕망을 상징
            </span>

            <span className="text-wrapper-50">
              합니다.
              <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-50">
              {"  "}마치 자신을 바라보다
              물속으로 빠져든
              나르키소스처럼,
              <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-50">
              {" "}
              《Blooming Desire》는
              당신에게 묻습니다.
              <br />
            </span>
          </p>

          <p className="text">
            <span className="text-wrapper-50">
              {" "}
            </span>

            <span className="text-wrapper-51">
              {" "}
              지금, 당신의 시선은 어떤
              감정을 담은 꽃으로
              피어났나요?
            </span>
          </p>
        </div>

        {/* ...rest of the component... */}
      </div>
    </div>
  );
};

// App 컴포넌트를 default export
const App = () => (
  <div>
    <Iphone />
  </div>
);
export default App;
