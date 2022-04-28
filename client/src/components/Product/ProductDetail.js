import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Location from "./Location";
import { useSelector } from "react-redux";
import DetailCarousel from "./DetailCarousel";
import QnA from "./QnA";
import "../../css/ProductDetail.scss";
import "../../css/Main.scss";

function ProductDetail() {
  const getAuthInfo = useSelector((state) => state);
  //const [product, setProduct] = useState({ a: null });
  const [color, setColor] = useState("secondary");
  const [product, setProduct] = useState({});
  const [commonList, setCommonList] = useState();
  const [cName, setCName] = useState("");
  const [isMe, setIsMe] = useState();

  let userId = "";
  let category = "";
  let prodId = "";
  const { id } = useParams();
  let email = "";
  if (getAuthInfo.isTrue) {
    email = getAuthInfo.user.email;
  } else {
  }
  const payUrl = `${email}`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/detail/${id}`
        );
        console.log(res.data);
        let commonInfo = res.data[0];
        let productInfo = res.data[1];
        console.log(productInfo);
        setProduct(productInfo);
        setCommonList(commonInfo);

<<<<<<< HEAD
        userId = res.data[1].Favorite.userId;
        category = res.data[1].Category.name;
        console.log(category);
        console.log(userId);
        userId !== null ? setColor("danger") : setColor("secondary");
=======
        res.data[1].Favorite !== null
          ? (userId = res.data[1].Favorite.userId)
          : (userId = "");
        res.data[1].Category.name != null
          ? (category = res.data[1].Category.name)
          : (category = "");

        userId === null ? setColor("danger") : setColor("secondary");
>>>>>>> main
        category !== null ? setCName(category) : setCName("");
        console.log(res.data[1]);
        res.data[1].seller === getAuthInfo.user.idx
          ? setIsMe(true)
          : setIsMe(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, []);

  const postProduct = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product/detail/postid`,
        { idx: id, userId: getAuthInfo.user.idx }
      );
      setColor(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="productDetail main">
      <div className="Container">
        <br />
        <hr />
        <div className="categoryBox">
          <i className="fa-solid fa-house"></i>
          <p className="home">홈</p>
          &nbsp;
          <i className="fa-solid fa-arrow-right"></i>
          &nbsp;
          <p className="categoryItem">{cName}</p>
        </div>
        <hr style={{ marginTop: "-5px", border: 0, height: "1px" }} />
        <div className="productContainer">
          <div className="carouselwidth">
            <DetailCarousel deliver={product} />
          </div>
          <div>
            <p className="pTitle">{product.title}</p>
            <p className="pPrice">{product.price}원</p>
            <hr />
            <div className="common">
              <ul className="commonkey">
                {commonList ? (
                  commonList.map((item, id) => {
                    return <li key={id}>{item.Column}</li>;
                  })
                ) : (
                  <></>
                )}
              </ul>
              <ul className="commonvalue">
                <li>{product.productStatus}</li>
                <li>{product.exchange}</li>
                <li>{product.address}</li>
                <li>{product.shippingincluded}</li>
              </ul>
            </div>
            <Button
              className="jjim"
              onClick={() => {
                postProduct();
              }}
            >
              찜하기
            </Button>
<<<<<<< HEAD
            &nbsp;&nbsp;
            <Link to={payUrl}>
              <Button>결제하기</Button>{" "}
            </Link>
=======

            {isMe == false ? (
              <Link to={payUrl}>
                <Button className="pay" style={{ marginLeft: "1rem" }}>
                  결제하기
                </Button>
              </Link>
            ) : (
              <Link to="/change">
                <Button className="modify" style={{ marginLeft: "1rem" }}>
                  수정하기
                </Button>
              </Link>
            )}
>>>>>>> main
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="MyProduct" className="mb-5">
        <Tab eventKey="MyProduct" title={`상품 정보`}>
          <div className="productContent">
            <div>
              <div>{product.seller}번 판매자의 상품설명</div>
              <hr />
              <div>{product.content}</div>
            </div>
            <span className="vertical-line3" />
            <div>
              <div className="preferplace">판매자가 선호하는 거래 장소. </div>
              <div className="productmap">
                <Location deliver={product} />
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="MyFavorite" title={`상품 문의`}>
          <QnA id={id} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProductDetail;
