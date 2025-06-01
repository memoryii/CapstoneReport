import React, {
  useRef,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec5.module.css";
import bgDefault from "../images/cluster1.png";

export default function Sec5({
  bgImage = bgDefault,
  texts = [],
  heatmap = [],
  circleColor = "rgba(255, 255, 255. 0.1)",

  radiusMultiplier = 4, // ← 기본 배수 1
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");

    // 1) Sec5 섹션의 실제 렌더된 크기를 측정
    const dispW = section.clientWidth;
    const dispH = section.clientHeight;

    // 2) 캔버스 내부 해상도를 그 크기로 설정(HTML 속성)
    canvas.width = dispW;
    canvas.height = dispH;

    // 3) 클리어 & 스타일 세팅
    ctx.clearRect(0, 0, dispW, dispH);
    ctx.fillStyle = circleColor;

    // 4) 원본 좌표계(1920×1080) 대비 스케일 계산
    const origW = 1920;
    const origH = 1080;
    const scaleX = dispW / origW;
    const scaleY = dispH / origH;
    const scaleR =
      (scaleX + scaleY) / 2; // 반지름은 평균 스케일

    // 5) heatmap 데이터 순회하며 원 그리기
    heatmap.forEach(({ x, y, r }) => {
      const cx = x * scaleX;
      const cy = y * scaleY;
      const cr =
        r * scaleR * radiusMultiplier;

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        cr,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }, [bgImage, heatmap, circleColor]);

  return (
    <section
      className={styles.sec5}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      ref={sectionRef}
    >
      <canvas
        className={styles.canvas}
        ref={canvasRef}
      />
      <div
        className={
          styles.textsContainer
        }
      >
        {texts.map((t, i) => (
          <div
            key={i}
            className={styles.textBox}
          >
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}

Sec5.propTypes = {
  bgImage: PropTypes.string,
  texts: PropTypes.arrayOf(
    PropTypes.string
  ),
  heatmap: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      r: PropTypes.number.isRequired,
    })
  ),
  circleColor: PropTypes.string,
  radiusMultiplier: PropTypes.number,
};
