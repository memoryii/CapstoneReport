import React, {
  useRef,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec2.module.css";

import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Sec2({
  headerLines = [],
  scores,
}) {
  const radarRef = useRef(null);

  useEffect(() => {
    const ctx =
      radarRef.current.getContext("2d");
    const {
      fixationTime,
      fixationCount,
      dispersion,
      transitionFreq,
      zoneDiversity,
    } = scores;

    const data = {
      labels: [
        "FIXATION TIME",
        "FIXATION COUNT",
        "DISPERSION",
        "TRANSITION FREQUENCY",
        "ZONE DIVERSITY",
      ],
      datasets: [
        {
          label: "시각화 점수",
          data: [
            fixationTime,
            fixationCount,
            dispersion,
            transitionFreq,
            zoneDiversity,
          ],
          backgroundColor:
            "rgba(0, 0, 0, 0)",
          borderColor:
            "rgba(54,162,235,1)",
          borderWidth: 1,
          pointBackgroundColor:
            "rgba(54,162,235,1)",
        },
      ],
    };

    const options = {
      scales: {
        r: {
          pointLabels: {
            font: { size: 10 },
            color: "#fff",
          },
          grid: {
            color: [
              "#1a1a1a",
              "#2a2a2a",
              "#3a3a3a",
              "#4a4a4a",
              "#5a5a5a",
              "#4a4a4a",
            ],
          },
          angleLines: { color: "#888" },
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: {
            stepSize: 2,
            display: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      maintainAspectRatio: false,
      responsive: true,
    };

    const chart = new Chart(ctx, {
      type: "radar",
      data,
      options,
    });

    return () => {
      chart.destroy();
    };
  }, [scores]);

  return (
    <section className={styles.sec2}>
      <div className={styles.header}>
        <h2>
          {/* headerLines 배열의 첫 줄, 둘째 줄을 각각 렌더 */}
          {headerLines.map(
            (line, i) => (
              <React.Fragment key={i}>
                <span
                  className={
                    i === 0
                      ? styles.mainLine
                      : styles.subLine
                  }
                >
                  {line}
                </span>
                {i <
                  headerLines.length -
                    1 && <br />}
              </React.Fragment>
            )
          )}
        </h2>
      </div>
      <div
        className={
          styles.radarContainer
        }
      >
        <canvas ref={radarRef} />
      </div>
    </section>
  );
}

Sec2.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  scores: PropTypes.shape({
    fixationTime: PropTypes.number,
    fixationCount: PropTypes.number,
    dispersion: PropTypes.number,
    transitionFreq: PropTypes.number,
    zoneDiversity: PropTypes.number,
  }).isRequired,
};
