import React from "react";
import "../../css/Header.scss";
import { Link } from "react-router-dom";
import Login from "../Payment/Login";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyPage from "../Mypage/MyPage";
import "../../css/SearchBar.scss";
import { Form } from "react-bootstrap";

const Header = () => {
  const getAuthInfo = useSelector((state) => state);
  const [modalShow, setModalShow] = useState(false);
  const [loginTitle, setLoginTitle] = useState("로그인/회원가입");
  const [myPageUrl, setMyPageUrl] = useState("/");
  const [sellingUrl, setSellingUrl] = useState("/");
  useEffect(() => {
    if (getAuthInfo.isTrue) {
      setLoginTitle("로그아웃");
      setMyPageUrl(`/mypage/${getAuthInfo.user.idx}`);
      setSellingUrl("/new-product");
    } else {
      setLoginTitle("로그인/회원가입");
    }
  }, []);
  const logout = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/logout`;
  };

  return (
    <header>
      <div className="logo-container">
        <img src="../logo.png" alt="douzoeunLogo" className="logo"></img>
        <div className="theme">
          <Link to="/" className="Name">
            Dou Market zone
          </Link>{" "}
        </div>
      </div>
      {/* <div className="search-container">
        <input className="searchBox" type="text" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div> */}
      <form className="search-container" action="">
        <input id="search-box" type="text" className="search-box" name="q" />
        <label for="search-box">
          <span className="fa-solid fa-magnifying-glass glyphicon glyphicon-search search-icon"></span>
        </label>
        <input type="submit" id="search-submit" />
      </form>
      <div className="menu-container">
        <Link to={sellingUrl}>판매하기</Link>

        <span className="vertical-line2"></span>
        <Link to={myPageUrl}>내상점</Link>
        <span className="vertical-line2"></span>
        <Link to="/">톡</Link>
        <span className="vertical-line2"></span>
        <p
          className="log"
          onClick={() => {
            setModalShow(!getAuthInfo.isTrue);
            getAuthInfo.isTrue ? logout() : setModalShow(true);
          }}
        >
          {loginTitle}
        </p>
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </header>
  );
};

export default Header;
