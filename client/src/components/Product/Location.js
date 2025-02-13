import React, { useEffect } from "react";
import "../../css/Location.scss";

const { kakao } = window;
const Location = ({ deliver }) => {
  const { address } = deliver;
  //console.log(locationX);

  useEffect(() => {
    var container = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(container, mapOption);
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(deliver.address, function (result, status) {
      console.log("맵 주소 위도경도 변환 함수 실행");
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          position: coords,
          map: map,
        });
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:100%;text-align:center;padding:6px 6px;">판매자가 선호하는 거래장소<br/>${deliver.address}</div>`,
        });
        infowindow.open(map, marker);
        marker.setMap(coords);
      }
    });
  }, []);

  return (
    <div className="mapContainer">
      <div id="map" style={{ width: "300px", height: "300px" }}></div>
    </div>
  );
};

export default Location;
