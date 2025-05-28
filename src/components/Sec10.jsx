import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec10.module.css";

export default function SecCredits({
  bgImage,
  lines = [],
}) {
  return (
    <section
      className={styles.credits}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className={
          styles.textsContainer
        }
      >
        {lines.map((text, i) => (
          <div
            key={i}
            className={styles.textBox}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}

SecCredits.propTypes = {
  bgImage: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.node
  ).isRequired,
};
