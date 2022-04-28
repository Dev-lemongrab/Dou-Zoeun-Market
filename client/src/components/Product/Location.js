import React, { useEffect } from "react";
import "../../css/Location.scss";

const { kakao } = window;
const Location = ({ deliver }) => {
  const { address } = deliver;
  //console.log(locationX);

  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();
    const container = document.getElementById("map");
    geocoder.addressSearch(deliver.address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const map = new kakao.maps.Map(container);
        const marker = new kakao.maps.Marker({
          position: coords,
          text: "거래 장소",
        });
        marker.setMap(map);
      }
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "350px", height: "400px" }}></div>
    </div>
  );
};

export default Location;
