import React from "react";
import "./preloader.css"

export default function Preloader() {
  return (
    <div id="preloader">
      <div className="lds-hourglass"></div>
    </div>
  );
}
