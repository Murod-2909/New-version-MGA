import React, { useEffect } from "react";
import logo from "../../../assests/images/white-logo.jpg";
import { MdOutlineEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { useTranslation } from "react-i18next";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTelegram,
  FaPhoneVolume,
} from "react-icons/fa6";
import { MdOutlineNavigateNext } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true, // faqat bir marta animatsiya bajariladi
      offset: 120,
    });
  }, []);
  return (
    <footer className="site-footer">
      <div className="site-footer-bg"></div>
      <div className="site-footer__top">
        <div className="container">
          <div className="rowss">
            <div className="site-footer__top_col3 fadeInUp animated">
              <div
                className="footer-widget"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                <div className="footer-widget__logo">
                  <a href="/">
                    <img src={logo} alt="MGA Reklama logo" />
                  </a>
                </div>
                <div className="footer-wigdet_text-box">
                  <p className="footer-widget_text-box_des">
                    {t("footerText")}
                  </p>
                </div>
                <div className="footer-widget__social">
                  <a
                    href="https://www.youtube.com/@mgareklama"
                    target="_blank"
                    rel="noreferrer"
                    className="fa-you"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://www.facebook.com/mgareklama/"
                    target="_blank"
                    rel="noreferrer"
                    className="fa-you"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/mgareklama/"
                    target="_blank"
                    rel="noreferrer"
                    className="fa-you"
                  >
                    <FaInstagram />
                  </a>
                  <a href="/" className="fa-you">
                    <FaTelegram />
                  </a>
                </div>
              </div>
            </div>
            <div className="site-footer__top_col3 fadeInUp animated">
              <div className="footer-widget">
                <div
                  className="footer-widget_explore clearfix"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="1000"
                >
                  <h3 className="footer-widget_explore__exTitle">{t("footMenu")}</h3>
                  <ul className="footer-widget_explore-list clearfix">
                    <li>
                      <a href="/about" className="lists">
                        {" "}
                        <MdOutlineNavigateNext />
                        {t("about")}
                      </a>
                    </li>
                    <li>
                      <a href="/serves" className="lists">
                        {" "}
                        <MdOutlineNavigateNext /> {t("serves")}
                      </a>
                    </li>
                    <li>
                      <a href="/gallery" className="lists">
                        {" "}
                        <MdOutlineNavigateNext />
                        {t("gallery")}
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="lists">
                        {" "}
                        <MdOutlineNavigateNext />
                        {t("contact")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          
            <div className="site-footer__top_col3 fadeInUp animated">
              <div className="footer-widget">
                <div
                  className="footer-widget_explore clearfix"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="1000"
                >
                  <h3 className="footer-widget_explore__exTitle">{t("work")}</h3>
                  <ul className="footer-widget_explore-list clearfix">
                    <li className="foot-icon">
                      <div className="call-icon">
                        <FaPhoneVolume className="phone-call" />
                      </div>
                      <div className="call-text">
                        <h5 className="call-text-h5">{t("call")}</h5>
                        <p className="call-text-pp">
                          <a className="call-text-aa" href="tel:+998770124004">
                            +998 77 012 40 04
                          </a>
                        </p>
                      </div>
                    </li>
                    <li className="foot-icon">
                      <div className="call-icon">
                        <MdOutlineEmail className="phone-call" />
                      </div>
                      <div className="call-text">
                        <h5 className="call-text-h5">{t("send")}</h5>
                        <p className="call-text-pp">
                          <a
                            className="call-text-aa"
                            href="mailto:info@mgareklama.com"
                          >
                            info@mgareklama.com
                          </a>
                        </p>
                      </div>
                    </li>
                    <li className="foot-icon">
                      <div className="call-icon">
                        <GrMapLocation className="phone-call" />
                      </div>
                      <div className="call-text">
                        <h5 className="call-text-h5">
                          Uzbekistan
                        </h5>
                        <p className="call-text-pp">
                          <a
                            className="call-text-aa"
                          >
                           {t("address")}
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <div className="site-footer__bottom_binner">
            <div className="bText">© 2025 Mga Reklama </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
