import React, { useRef, useEffect, useCallback } from "react";
//get everything from three.js// holy shit
import * as THREE from "three";

//import { onWindowResize } from "../eventDefinations";

export default function canvas({ image }) {
  const canvasContainer = useRef(null);

  //variable declarations
  var camera, scene, renderer, mesh;

  var onMouseDownMouseX = 0,
    onMouseDownMouseY = 0,
    lon = 0,
    onMouseDownLon = 0,
    lat = 0,
    onMouseDownLat = 0,
    phi = 0,
    theta = 0,
    isUserInteracting = false;

  var material;

  var onWindowResize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  function onMouseDown(event) {
    isUserInteracting = true;
    //get the x and y coordinates from  screen
    var clientX = event.clientX || event.touches[0].clientX;
    var clientY = event.clientY || event.touches[0].clientY;

    //the following two varibles will be used  for mouse move   !!!! events !!!!
    onMouseDownMouseX = clientX;
    onMouseDownMouseY = clientY;
    //get the current latitude and longitude of the globe/spherical surface!!!!!!
    onMouseDownLon = lon;
    onMouseDownLat = lat;
  }

  function onMouseMove(event) {
    if (isUserInteracting === true) {
      //only if user controls the camera

      //this function will be called multiple times with new x and y coordinated voila!!

      var clientX = event.clientX || event.touches[0].clientX;
      var clientY = event.clientY || event.touches[0].clientY;

      //while the mouse were kept down  we took a record of their past x and y coordinated
      //we add them to the current x and y coordinates
      //lon =newlongitude + oldlongitude

      //(onMouseDownMouseX - clientX) * 0.1 controls how fast must we turn up and down
      //multiplying by 0.1 will slow down the rotation

      //how far the camera need to travel, the same as the distance travelled by the mouse
      lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
      lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
    }
  }
  function onMouseUp() {
    isUserInteracting = false;
  }

  function onDocumentMouseWheel(event) {
    //when mouse wheel is altered we just need to control the field of vision in the scene
    //current fov + fractional part to not go crazy

    // alert("sad");
    var fov = camera.fov + event.deltaY * 0.5;
    camera.fov = THREE.Math.clamp(fov, 10, 75);
    //call the following function for  updating the camera
    camera.updateProjectionMatrix();
  }

  function onFileDropped(event) {
    event.preventDefault();
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function(event) {
        material.map.image.src = event.target.result;
        material.map.needsUpdate = true;
      },
      false
    );
    reader.readAsDataURL(event.dataTransfer.files[0]);
    document.body.style.opacity = 1;
  }

  function onDragOver(event) {
    //allow drop basically !!!!
    event.preventDefault();

    //cursor copy
    event.dataTransfer.dropEffect = "copy";

    //copy whatever is send on it //
  }

  function onDragLeave() {
    document.body.style.opacity = 1;
  }

  function onDragEnter() {
    document.body.style.opacity = 0.5;
  }

  useEffect(() => {
    //this will run just 1 time
    //good place for initialization

    /////////////////event based functions calling here///////////////////////////////////////////////////

    window.addEventListener("resize", onWindowResize, false);
    //mouse move events
    canvasContainer.current.addEventListener("mousedown", onMouseDown, false);
    canvasContainer.current.addEventListener("mousemove", onMouseMove, false);
    canvasContainer.current.addEventListener("mouseup", onMouseUp, false);

    //touch devices  no click available there unfortunately woww so wonderful !!!!!!!
    canvasContainer.current.addEventListener("touchstart", onMouseDown, false);
    canvasContainer.current.addEventListener("touchmove", onMouseMove, false);
    canvasContainer.current.addEventListener("touchend", onMouseUp, false);

    document.addEventListener("wheel", onDocumentMouseWheel, false);

    //lets control the coolest effect available here ///
    // drag and drop new images))

    canvasContainer.current.addEventListener("dragenter", onDragEnter, false);
    canvasContainer.current.addEventListener("dragleave", onDragLeave, false);

    canvasContainer.current.addEventListener("dragover", onDragOver, false);

    canvasContainer.current.addEventListener("drop", onFileDropped, false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    //define which type of camera , -----> 3d world like or rise of legends like ?
    camera = new THREE.PerspectiveCamera(
      75, //field of vision
      window.innerWidth / window.innerHeight, //aspect ratio
      1, //min distance from camera
      1100 //max distance from camera
    );

    //what the hell is this ?

    //so this is a 3 dimensions plot
    camera.target = new THREE.Vector3(0, 0, 0);

    //Scenes allow you to set up what and where is
    //to be rendered by three.js.
    // This is where you place objects, lights and cameras.

    //basically a world sort of ?????

    scene = new THREE.Scene();

    //Holy shit !! explaination please someone anyone !!!

    // basically An efficient representation of mesh, line, or point geometry

    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    //creating a spehere geometry
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    //basically like a brick )  repeated stuff //
    var texture = new THREE.TextureLoader().load(image);

    //A material for drawing geometries in a simple shaded (flat or wireframe) way.
    material = new THREE.MeshBasicMaterial({ map: texture });

    //see the dolphin in the given link 1 )the shape  is defined by geometry
    //and the material used there in the form of triange see ?!!!
    //https://en.wikipedia.org/wiki/Polygon_mesh
    mesh = new THREE.Mesh(geometry, material);
    //woww !!! so basically we generated a spehere with our texture (As an image offcource!!!)
    //add this mesh to our world of a sort !!
    scene.add(mesh);

    //webgl comes into action here woww!!

    //basic settings here!!

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //  renderer.render(scene, camera);

    //add the canvas inside the canvas container
    canvasContainer.current.appendChild(renderer.domElement);

    function animate() {
      //basically a loop forever enjoy !!!
      requestAnimationFrame(animate);
      update();
    }

    function update() {
      if (isUserInteracting === false) {
        lon += 0.1;
        ///  lat += 0.1;
      }
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.Math.degToRad(90 - lat);
      theta = THREE.Math.degToRad(lon);

      camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
      camera.target.y = 500 * Math.cos(phi);
      camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(camera.target);
      /*
        //uncomment this to get to a spherical inward pointed sphere
            // distortion
            camera.position.copy( camera.target ).negate();
            */
      renderer.render(scene, camera);
    }

    animate(); //call for loop

    return () => {
      //this is for clean Up purposes to dont clatter our UI

      //First remove all event listners

      window.removeEventListener("resize", onWindowResize, false);
      canvasContainer.current.removeEventListener(
        "mousedown",
        onMouseDown,
        false
      );
      canvasContainer.current.removeEventListener(
        "mousemove",
        onMouseMove,
        false
      );
      canvasContainer.current.removeEventListener("mouseup", onMouseUp, false);
      canvasContainer.current.removeEventListener(
        "touchstart",
        onMouseDown,
        false
      );
      canvasContainer.current.removeEventListener(
        "touchmove",
        onMouseMove,
        false
      );
      canvasContainer.current.removeEventListener("touchend", onMouseUp, false);
      document.removeEventListener("wheel", onDocumentMouseWheel, false);
      canvasContainer.current.removeEventListener(
        "dragenter",
        onDragEnter,
        false
      );
      canvasContainer.current.removeEventListener(
        "dragleave",
        onDragLeave,
        false
      );
      canvasContainer.current.removeEventListener(
        "dragover",
        onDragOver,
        false
      );
      canvasContainer.current.removeEventListener("drop", onFileDropped, false);

      //remove the canvas itself;

      canvasContainer.current.innerHTML = "";
    };
  }, [image]);

  return (
    <div className="container" ref={canvasContainer}>
      {/* <div className="sampleGallery">{renderListofItems()}</div> */}
    </div>
  );
}
