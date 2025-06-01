// ───────────────────────────────────────────────────
// src/components/Header/Header.jsx
// ───────────────────────────────────────────────────
import React from "react";
import styles from "../styles/Header.module.css";

export default function Header({
  config,
}) {
  if (!config) return null;

  const { bgImage, textBoxes } = config;
  const headerStyle = {
    backgroundImage: `url(${bgImage})`,
    /* 필요시 추가 스타일 지정 가능 */
  };

  return (
    <header
      className={styles.header}
      style={headerStyle}
    >
      {/* 최상단 중앙 텍스트: 고정 "INFLORIA / Result Report" */}
      <div className={styles.topText}>
        <h1
          className={styles.topPrimary}
        >
          INFLORIA
        </h1>
        <h2
          className={
            styles.topSecondary
          }
        >
          Result Report
        </h2>
      </div>

      {/* 아래는 textBoxes 배열을 순회하여 렌더링 */}
      {textBoxes.map((box, i) => {
        const {
          content,
          style,
          className,
        } = box;

        // (1) content가 배열 => 메인/서브 라인 <h2>로 분리
        if (Array.isArray(content)) {
          return (
            <h2
              key={i}
              className={styles.title}
              style={style}
            >
              <span
                className={
                  styles.mainLine
                }
              >
                {content[0]}
              </span>
              <span
                className={
                  styles.subLine
                }
              >
                {content[1]}
              </span>
            </h2>
          );
        }

        // (2) content가 JSX 노드인 경우: 그대로 렌더링
        if (
          React.isValidElement(content)
        ) {
          return (
            <div key={i} style={style}>
              {content}
            </div>
          );
        }

        // (3) content가 문자열인 경우: 기본 텍스트 박스 처리
        //     className이 주어졌으면 해당 CSS 모듈 클래스 추가
        const classes = [
          styles.textBox,
        ];
        if (
          className &&
          styles[className]
        ) {
          classes.push(
            styles[className]
          );
        }

        return (
          <div
            key={i}
            className={classes.join(
              " "
            )}
            style={style}
          >
            {content}
          </div>
        );
      })}
    </header>
  );
}
