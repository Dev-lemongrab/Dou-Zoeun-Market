import React from "react";
import MainCarousel from "./MainCarousel";
import Product from "../Product/Product";
import "../../css/Main.scss";
import gsap from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import "../../css/TotopIcon.scss";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const MainPage = () => {
  const toTop = (e) => {
    if (!window.scrollY) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="main">
      <MainCarousel />
      <br />
      <div id="to-top" onClick={toTop}>
        <BsFillArrowUpCircleFill className=".material-icons" />
      </div>
      <Product url="product" />
    </div>
  );
};

export default MainPage;
