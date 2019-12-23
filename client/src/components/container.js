import React, { useEffect } from "react";
import * as THREE from "three";

export default function container({ image }) {
  var camera, scene, renderer, container, mesh;

  var isUserInteracting = false,
    lon = 0,
    lat = 0,
    phi = 0,
    theta = 0;

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

    var texture = new THREE.TextureLoader().load(image);
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

    return () => {
      container = document.querySelector(".container");
      container.innerHTML = "";
    };
  }, [image]);
  return (
    <div className="container" onLoad={e => {}}>
      {/* <div className="sampleGallery">{renderListofItems()}</div> */}
    </div>
  );
}
