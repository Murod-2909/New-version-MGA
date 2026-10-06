import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Link from "../../LocaleLink";
import { stripLang, withLang } from "../../../serves/locale";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";

import logo from "../../../assests/images/Log.png";
import "../../../assests/style/header.scss";
import Language from "../../Language/language";
import MobileMenu from "./mobile/MobileMenu";
const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const rawPath = stripLang(location.pathname);
  // Service and production detail pages belong to the "Services" menu item.
  const currentPath = /^\/(services|production)\//.test(rawPath) ? "/serves" : rawPath;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="main_header clearfix">
        <div className="main_header_top">
          <div className="container">
            <div className="main_header_top_inner clearfix">
              <div className="main_header_top_inner_logo">
                <Link to="/">
                  <img src={logo} className="logoItem" alt="MGA Reklama logo" />
                </Link>
              </div>
              <div className="main_header_top_inner_right">
                <div className="main_header_top_inner_right_content">
                  <div className="main_header_top_inner_right_content_address">
                    <ul className="main_header_top_inner_right_content_address_topBox">
                      <li className="main_header_top_inner_right_content_address_topBox_li">
                        <div className="icon">
                          <FiPhoneCall
                            style={{ width: "25px", height: "35px" }}
                          />
                        </div>
                        <div className="main_header_top_inner_right_content_address_topBox_li_texts">
                          <p className="ps">{t("call")}</p>
                          <h5 className="h5">
                            <a className="h5" href="tel:+99877 0124004">
                              +998 77 012 40 04
                            </a>
                          </h5>
                        </div>
                      </li>
                      <li className="main_header_top_inner_right_content_address_topBox_li">
                        <div className="icon">
                          <IoMailOpenOutline
                            style={{ width: "30px", height: "35px" }}
                          />
                        </div>
                        <div className="main_header_top_inner_right_content_address_topBox_li_texts">
                          <p className="ps">{t("send")}</p>
                          <h5 className="h5">
                            <a
                              className="h5"
                              href="mailto:info@mgareklama.com"
                            >
                              info@mgareklama.com
                            </a>
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="main_header_top_inner_right_content_right-social">
                    <a
                      href="https://www.facebook.com/mgareklama/"
                      target="_blank"
                      className="social-icon"
                      aria-label="Facebook"
                      
                      rel="noreferrer"
                    >
                      <FaFacebookSquare />
                    </a>
                    <a
                      href="https://www.instagram.com/mgareklama/"
                      target="_blank"
                      className="social-icon"
                      aria-label="Instagram"
                      
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a href="#" className="social-icon"
                      aria-label="Telegram" target="_blank">
                      <FaTelegram />
                    </a>
                    <a
                      href="https://www.youtube.com/@mgareklama"
                      target="_blank"
                      className="social-icon"
                      aria-label="YouTube"
                     
                      rel="noreferrer"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          className={`main-menu clearfix ${
            isScrolled ? "stricky-header stricky-fixed" : ""
          }`}
        >
          <div className="main-menu_wrapper clearfix">
            <div className="container">
              <div className="main-menu_wrapper_inners clearfix">
                <div className="main-menu_wrapper_inners_left">
                  <div className="main-menu_wrapper_inners_left_boxMenu">
                    <button
                      onClick={() => setIsMenuOpen(true)}
                      className="burger"
                      aria-label="Menu"
                    >
                      <RxHamburgerMenu />
                    </button>

                    <ul
                      className={`main-menu_wrapper_inners_left_boxMenu_list ${
                        isMenuOpen ? "active" : ""
                      }`}
                    >
                      <li
                        className={currentPath === "/" ? "current" : ""}
                      >
                        <Link to="/" className="current_items">
                         {t("main")}
                        </Link>
                        {currentPath === "/" && (
                          <span className="current_border"></span>
                        )}
                      </li>

                      <li
                        className={
                          currentPath === "/about" ? "current" : ""
                        }
                      >
                        <Link to="/about" className="current_items">
                          {t("about")}
                        </Link>
                        {currentPath === "/about" && (
                          <span className="current_border"></span>
                        )}
                      </li>

                      <li
                        className={
                          currentPath === "/gallery" ? "current" : ""
                        }
                      >
                        <Link to="/gallery" className="current_items">
                          {t("gallery")}
                        </Link>
                        {currentPath === "/gallery" && (
                          <span className="current_border"></span>
                        )}
                      </li>

                      <li
                        className={
                          currentPath === "/serves" ? "current" : ""
                        }
                      >
                        <Link to="/serves" className="current_items">
                          {t("serves")}
                        </Link>
                        {currentPath === "/serves" && (
                          <span className="current_border"></span>
                        )}
                      </li>

                      <li
                        className={
                          currentPath === "/contact" ? "current" : ""
                        }
                      >
                        <Link to="/contact" className="current_items">
                          {t("contact")}
                        </Link>
                        {currentPath === "/contact" && (
                          <span className="current_border"></span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="main-menu_wrapper_inners_right">
                  <div className="main-menu_wrapper_inners_right_btn">
                    <div className="main-menu_wrapper_inners_right_btn_language">
                      <Language />
                    </div>
                    <div className="main-menu_wrapper_inners_right_btn_btnBox">
                      <a
                        href={withLang("/catalogBook", i18n.language)}
                        target="_blank"
                        className="main-menu_wrapper_inners_right_btn_btnBox_thn"
                      >
                        E-Catalog
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
