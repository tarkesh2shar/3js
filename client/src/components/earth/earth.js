import React,{useEffect} from 'react'
import TrackballControls from 'three-trackballcontrols';
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three-css3drenderer";
import Earth from '../../../assets/earth.jpg';

export default function earth() {

    var onWindowResize = function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

    useEffect(()=>{

       

        var w = 800, h = 800;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(w, h);
        var view = document.getElementById("view");
        view.appendChild(renderer.domElement);
    
        var camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
        camera.position.set(0, 0, 200);
        var controls = new TrackballControls(camera, view);
        window.addEventListener("resize", function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          }, false);
        // The earth object
        // curl -Lo mercator.jpg http://goo.gl/xNgf4d
        // convert -resize 1024x1024! mercator.jpg earth.jpg
        // the side border is laongitude 180deg: -180 -> 0 -> 180
        var tex = THREE.ImageUtils.loadTexture(Earth);
        var earth = new THREE.Mesh(
            new THREE.SphereGeometry(50, 32, 32),
            new THREE.MeshBasicMaterial({map: tex}));
        // note: sphere geometry and tex coords
        // (x,z) = (-1, 0) -> (0, 1) -> (1, 0) -> (0, -1) -> (-1, 0)
        // mercator maps's long 0deg is on (1, 0)
    
        // marker object
        var pointer = new THREE.Mesh(
            new THREE.CylinderGeometry(2, 0, 10),
            new THREE.MeshPhongMaterial({color: 0xcc9900}));
        pointer.position.set(55, 0, 0); // rotating obj should set (X > 0, 0, 0)
        pointer.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0));
        var marker = new THREE.Object3D();
        marker.add(pointer);
    
        // setup scene
        var obj = new THREE.Object3D();
        obj.add(marker);
        obj.add(earth);
        var scene = new THREE.Scene();
        scene.add(obj);
        var lightA = new THREE.DirectionalLight(0xffffff);
        lightA.position.set(0, 200, 0);
        scene.add(lightA);
        
        // [initial position] rotate by lat/long
        // For ball is at (X,0,0), the lat rotation should be around Z axis
        var rad = Math.PI / 180;
        marker.quaternion.setFromEuler(
            new THREE.Euler(0, 135 * rad, 45 * rad, "YZX")); 
    
        // animation
        var loop = function loop() {
            requestAnimationFrame(loop);
            obj.rotation.y += 0.005;
            controls.update();
            renderer.clear();
            renderer.render(scene, camera);
        };
        loop();
        
        // from geolocation API
        navigator.geolocation.watchPosition(function (pos) {
            var lat = pos.coords.latitude, lon = pos.coords.longitude;
            marker.quaternion.setFromEuler(
                new THREE.Euler(0, lon * rad, lat * rad, "YZX")); 
        });
  
    


    },[])
    return (
        <div id="view"></div>
    )
}
