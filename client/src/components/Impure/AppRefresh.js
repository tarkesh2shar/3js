import React, { useState } from "react";
import Container from "./container";
import SampleImage from "../../../assets/sample1.jpg";

import SampleImage1 from "../../../assets/sample2.jpg";
import SampleImage2 from "../../../assets/sample3.jpg";
import SampleImage3 from "../../../assets/sample4.jpg";
import SampleImage4 from "../../../assets/sample5.jpg";
import SampleImage5 from "../../../assets/sample6.jpg";

export default function AppRefresh() {
  var images = [
    SampleImage1,
    SampleImage2,
    SampleImage3,
    SampleImage4,
    SampleImage5
  ];

  const [state, setstate] = useState(SampleImage);

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

  return (
    <div>
      <Container image={state} />
      <div className="sampleGallery">{renderListofItems()}</div>
    </div>
  );
}
