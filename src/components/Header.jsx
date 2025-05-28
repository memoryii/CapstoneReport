// components/Header/Header.jsx
import React from "react";
import styles from "../styles/Header.module.css";

export default function Header({
  config,
}) {
  return (
    <header
      className={styles.header}
      style={{
        backgroundImage: `url(${config.bgImage})`,
      }}
    >
      {/* ← 여기 추가 */}
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
      {config.textBoxes.map(
        (box, i) => {
          const {
            content,
            style,
            className,
          } = box;
          // content가 배열이면 main/sub 라인으로 분리
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
          // 일반 텍스트 박스
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
          // 단일 문자열이면 기존 방식
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
        }
      )}
    </header>
  );
}
