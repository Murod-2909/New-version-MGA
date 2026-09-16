import React, { useEffect } from "react";
import "./home.scss";
import Hero from "../../components/Hero/hero";
import Partner from "../../components/Partner";
import NewLetter from "../../components/newLetter";
import AboutCompany from "../../components/Pession";
import HomeServices from "../../components/HomeServies";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../reduxToolkit/servesSlice";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.servicesSlider?.servicesData);
    const language = useSelector((state) => state.language.language);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch, language]);
  return (
    <div className="home">
      <Hero />
      <AboutCompany headingLevel="h1" />
      <HomeServices servicesData={services} />
    
      <Partner />
      <NewLetter />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </div>
  );
};

export default Home;
