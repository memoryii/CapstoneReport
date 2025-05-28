/* components/Sec9.jsx */
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec9.module.css";
import bgDefault from "../images/01.png";

export default function Sec9({
  bgImage = bgDefault,
  texts = [],
}) {
  return (
    <section
      className={styles.sec9}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className={
          styles.textsContainer
        }
      >
        {texts.map((text, idx) => (
          <div
            key={idx}
            className={styles.textBox}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}

Sec9.propTypes = {
  bgImage: PropTypes.string,
  texts: PropTypes.arrayOf(
    PropTypes.string
  ),
};
