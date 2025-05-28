// src/components/Sec4.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec4.module.css";

export default function Sec4({
  cells,
}) {
  return (
    <section className={styles.sec4}>
      {cells.map((cell, i) => (
        <div
          key={i}
          className={`${styles.cell} ${
            styles[`cell${i + 1}`]
          }`}
        >
          <div
            className={styles.cellTitle}
            style={{
              ...(cell.titleSize && {
                fontSize:
                  cell.titleSize,
              }),
              ...(cell.titleWeight && {
                fontWeight:
                  cell.titleWeight,
              }),
            }}
          >
            {cell.title}
          </div>
          <div
            className={styles.cellText}
            style={{
              ...(cell.textSize && {
                fontSize: cell.textSize,
              }),
              ...(cell.textWeight && {
                fontWeight:
                  cell.textWeight,
              }),
            }}
          >
            {cell.text}
          </div>
        </div>
      ))}
    </section>
  );
}

Sec4.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      title:
        PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      titleSize: PropTypes.string,
      titleWeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      textSize: PropTypes.string,
      textWeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ).isRequired,
};
