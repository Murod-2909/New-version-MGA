// components/MobileMenu.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import "./style.scss";
import logo from "../../../../assests/images/Log.png";

const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div
          className="mobile-menu-backdrop"
          onClick={() => onClose(false)}
        />
      </CSSTransition>

      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div className="mobile-menu-sheet">
          <div className="mobile-menu-sheet__header">
            <img src={logo} alt="MGA Reklama logo" className="logo" />
            <button className="close-btn" onClick={() => onClose(false)}>
              <RxCross2 />
            </button>
          </div>
          <ul className="mobile-menu-sheet__nav">
            {[
              { path: "/", label: t("main") },
              { path: "/about", label: t("about") },
              { path: "/gallery", label: t("gallery") },
              { path: "/serves", label: t("serves") },
              { path: "/contact", label: t("contact") },
            ].map(({ path, label }) => (
              <li
                key={path}
                className={location.pathname === path ? "active" : ""}
              >
                <Link to={path} onClick={() => onClose(false)}>
                  {label}
                  <hr />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  );
};

export default MobileMenu;
