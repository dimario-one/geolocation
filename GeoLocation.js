import React, { useEffect, useState } from "react";
import "./geolocation.css";

import { useHttp } from "../../../../hooks/http.hook";
let flag = false;

export default function GeoLocation() {
  const { request } = useHttp();
  const [city, setCity] = useState(localStorage.getItem("city"));
  useEffect(() => {
    async function req() {
      if (!city) {
        if (!flag) {
          const onChange = async ({ coords }) => {
            const responce = await request(
              "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address",
              "POST",
              {
                lat: coords.latitude,
                lon: coords.longitude,
                count: 1,
              },
              {
                Authorization: "Токен авторизации",
              }
            );
            localStorage.setItem("city", responce.suggestions[0].data.city);
            setCity(responce.suggestions[0].data.city);
            flag = true;
          };

          const onError = (err) => {
            console.log(err);
          };
          navigator.geolocation.getCurrentPosition(onChange, onError);
        }
      }
    }
    req();
  }, [city, request]);

  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center">
          <div className="">
            <img
              className=""
              src="../../../../../../img/point.png"
              alt="point icon"
            />
          </div>
          <div className="d-flex align-items-center">
            <span className="text-text-geolocation ms-2">Ваш город:</span>
            <span className="text-city-geolocation ms-md-2">{city}</span>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
