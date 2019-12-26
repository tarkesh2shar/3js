import React, { useState } from "react";
import CanvasController from "./canvas";
import Image from "../../../assets/sample1.jpg";

import SampleImage1 from "../../../assets/sample2.jpg";
import SampleImage2 from "../../../assets/sample3.jpg";
import SampleImage3 from "../../../assets/sample4.jpg";
import SampleImage4 from "../../../assets/sample5.jpg";
import SampleImage5 from "../../../assets/sample6.jpg";

var images = [
  SampleImage1,
  SampleImage2,
  SampleImage3,
  SampleImage4,
  SampleImage5
];

export default function tbl() {
  function renderListofItems() {
    return images.map(item => {
      return (
        <div
          className="minibox"
          key={item}
          onClick={e => {
            setstate(item);
            console.log("clickedItem", item);
          }}
        >
          <img src={item} />
        </div>
      );
    });
  }
  const [state, setstate] = useState(localStorage.getItem("img_url"));
  return (
    <div className="tbl_hell_Container">
      {/* We need two things here */}

      <div className="tbl_image_container">{renderListofItems()}</div>

      <CanvasController image={state} />
    </div>
  );
}
