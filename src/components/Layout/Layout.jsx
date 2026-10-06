import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { stripLang } from "../../serves/locale";
import Header from "./Header/header";
import { FaAngleUp } from "react-icons/fa";
import Footer from "./Footer/footer";
import CustomCursor from "../customCurson/custonCurson";

const Layout = (props) => {
  const { children } = props;

  const { pathname } = useLocation();
  const [text, setText] = useState("");
  const [speaker, setSpeaker] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const changeSpeakSwitcher = (value) => {
    setSpeaker(value);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowTopBtn(window.scrollY > 100);
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.onmouseup = () => {
      const selectedText = window.getSelection().toString();
      if (speaker && text !== selectedText) {
        window.responsiveVoice.speak(selectedText, "Russian Female");
        setText(selectedText);
      }
    };
  }, [speaker]);

  // Bu yerda /catalogBook sahifasini tekshiramiz
  const isCatalogBookPage = stripLang(pathname) === "/catalogBook";

  return (
    <div className="page-wrapper">
      <>
        <CustomCursor />
        {!isCatalogBookPage && (
          <Header speaker={speaker} changeSpeakSwitcher={changeSpeakSwitcher} />
        )}
        <main className="page-content" id="main">{children}</main>
        {showTopBtn && (
          <button className="scroll-to-top" onClick={goToTop} aria-label="Back to top">
            <FaAngleUp />
          </button>
        )}
        {!isCatalogBookPage && <Footer />}
      </>
    </div>
  );
};

export default Layout;
