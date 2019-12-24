import React, { useEffect, useState } from "react";
import SampleImage from "../../../assets/sample1.jpg";
import SampleImage1 from "../../../assets/sample2.jpg";
import SampleImage2 from "../../../assets/sample3.jpg";
import SampleImage3 from "../../../assets/sample4.jpg";
import SampleImage4 from "../../../assets/sample5.jpg";
import SampleImage5 from "../../../assets/sample6.jpg";
import * as THREE from "three";

export default function App() {
  var camera, scene, renderer, container, mesh;

  var isUserInteracting = false,
    lon = 0,
    lat = 0,
    phi = 0,
    theta = 0;

  var images = [
    SampleImage1,
    SampleImage2,
    SampleImage3,
    SampleImage4,
    SampleImage5
  ];

  const [state, setstate] = useState(SampleImage);

  useEffect(() => {
    //get the container

    container = document.querySelector(".container");

    //setting Camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1100
    );
    camera.target = new THREE.Vector3(0, 0, 0);
    //setting Scene
    scene = new THREE.Scene();

    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    var texture = new THREE.TextureLoader().load(state);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Setting Scene
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // a super big function here//
    function animate() {
      requestAnimationFrame(animate);
      update();
    }

    function update() {
      if (isUserInteracting === false) {
        lon += 0.1;
      }
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.Math.degToRad(90 - lat);
      theta = THREE.Math.degToRad(lon);
      camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
      camera.target.y = 500 * Math.cos(phi);
      camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(camera.target);
      /*
        // distortion
        camera.position.copy( camera.target ).negate();
        */
      renderer.render(scene, camera);
    }
    animate();
  }, [state]);

  function renderListofItems() {
    return images.map(item => {
      return (
        <div
          className="minibox"
          key={item}
          onClick={e => {
            console.log("clickedItem", item);
          }}
        >
          <img src={item} />
        </div>
      );
    });
  }

  return (
    <div className="container" onLoad={e => {}}>
      <div className="sampleGallery">{renderListofItems()}</div>
    </div>
  );
}
/*
        To actually be able to display anything with three.js,
         we need three things: 
         scene, camera and renderer,
         so that we can render the 
         scene with camera.


        */

// scene = new THREE.Scene();
// camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// var renderer = new THREE.WebGLRenderer();
// var container = document.querySelector(".container");
// container.append(renderer.domElement);

// function animate() {
//   requestAnimationFrame(animate);
//   update();
// }
