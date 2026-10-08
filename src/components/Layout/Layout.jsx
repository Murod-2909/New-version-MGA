import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stripLang } from "../../serves/locale";
import Header from "./Header/header";
import { FaAngleUp } from "react-icons/fa";
import Footer from "./Footer/footer";
import CustomCursor from "../customCurson/custonCurson";

const Layout = (props) => {
  const { children } = props;

  const { pathname } = useLocation();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Bu yerda /catalogBook sahifasini tekshiramiz
  const isCatalogBookPage = stripLang(pathname) === "/catalogBook";

  return (
    <div className="page-wrapper">
      <>
        <CustomCursor />
        {/* One container for every toast (contact form, newsletter, ...) */}
        <ToastContainer position="top-right" autoClose={3500} />
        {!isCatalogBookPage && (
          <Header />
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
