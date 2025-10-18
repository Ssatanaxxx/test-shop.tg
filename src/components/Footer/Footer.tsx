import React from "react";
import "./Footer.css";
import TelegrammIcon from "../../assets/icon.svg";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p className="footer__text">Разработано на платформе Noxer</p>
          <a href="#" className="footer__link">
            <img src={TelegrammIcon} alt="telegramm icon" />
            <span className="footer__link-text">noxeral_bot</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
