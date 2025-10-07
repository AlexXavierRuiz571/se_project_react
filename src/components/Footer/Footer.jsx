import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Alex Xavier Ruiz</p>
      <p className="footer__year">{year}</p>
    </footer>
  );
}
