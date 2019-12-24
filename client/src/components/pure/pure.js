import React, { Component } from "react";
import SampleImage from "../../../assets/sample1.jpg";

export default class pure extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Courier";
      ctx.fillText("tarkesh2shar", 210, 75);
    };

    const dataURL = canvas.toDataURL();

    console.log("dataurl", dataURL);
  }

  render() {
    return (
      <div>
        da
        <canvas ref="canvas" width={640} height={425} />
        <img ref="image" src={SampleImage} className="hidden" />
      </div>
    );
  }
}
