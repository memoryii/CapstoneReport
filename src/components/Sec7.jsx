// src/components/Sec7.jsx
import React, {
  useEffect,
} from "react";
import PropTypes from "prop-types";
import styles from "../styles/Sec7.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Sec7({
  title,
  children,
}) {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 600,
    });
  }, []);
  return (
    <section className={styles.sec7}>
      <h2
        className={styles.title}
        data-aos="fade-up"
        data-aos-delay="0"
      >
        {title}
      </h2>
      <div
        className={styles.underline}
        data-aos="fade-up"
        data-aos-delay="0"
      ></div>
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
