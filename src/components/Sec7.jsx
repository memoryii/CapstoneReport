// src/components/Sec7.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec7.module.css";

export default function Sec7({
  title,
  children,
}) {
  return (
    <section className={styles.sec7}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <div
        className={styles.underline}
      />
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}

Sec7.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
