import React, {useState, useRef, useEffect} from "react";
import { Link, Router, useParams } from "react-router-dom";
import "bootstrap";
import "../../css/Profile.scss";
import axios from "axios";
import {useSelector} from "react-redux";

export default function Profile() {
  const [profileImg, setImg] = useState("../defaultProfile.jpg");
  const [modalShow, setModalShow] = useState(false);
  const fileInput = useRef(null);
  const [nickName, setNick] = useState("닉네임을 설정해주세요");
  const [rate, setRate] = useState(0);
  const percent = rate * 20;
  let tmpImg = "";

  const getAuthInfo = useSelector((state) => state);
  const {userId} = useParams();
  console.log("USER ID", userId);

  //프로필 사진 변경 함수
  const onChange = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/mypage/img/${userId}`,
        {img : profileImg});
  };

  useEffect(async ()=>{
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/mypage/profile/${userId}`);
    setNick(res.data.nickName);
    setRate(res.data.rate);
    setImg(res.data.img);
  },[]);


  async function withdraw(){
    if (window.confirm("탈퇴하시겠습니까?")) {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/mypage/withdraw/${userId}`);
      alert("탈퇴되었습니다.");
      window.location.href="http://localhost/3000";
    } else {
      alert("취소합니다.");
    }
  };

  return (
    <div className="profile">
      <img
        className="profileImg"
        src={profileImg}
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <input
        type="file"
        name="profileImageUpload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onChange}
        ref={fileInput}
      />

      <div className="userInfo">
        <span className="nick">{nickName}</span>

        <div className="star-ratings">
          <div className="star">
            <div
              className="fill-star space-x-2"
              style={{ width: `${percent}%` }}
            >
              <img src="../fullStar.png"/>
              <img src="../fullStar.png"/>
              <img src="../fullStar.png"/>
              <img src="../fullStar.png"/>
              <img src="../fullStar.png"/>
            </div>
            <div className="empty-star space-x-2">
              <img src="../emptyStar.png" />
              <img src="../emptyStar.png" />
              <img src="../emptyStar.png" />
              <img src="../emptyStar.png" />
              <img src="../emptyStar.png" />
            </div>
          </div>
          <span>{rate}점</span>
        </div>
      </div>

        <button type="button" className="btn btn-danger" onClick={withdraw}>
          회원탈퇴
        </button>
    </div>
  );
}
