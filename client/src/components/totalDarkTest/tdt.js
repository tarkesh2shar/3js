import React,{useEffect,useRef} from 'react'
import * as THREE from 'three';
import Controller from 'three-trackballcontrols';
import {CSS3DRenderer,CSS3DObject} from 'three-css3drenderer' 
import SampleImage from '../../../assets/sample6.jpg';

export default function tdt() {


    const canvasContainer = useRef(null);

    //variable declarations
    var camera, scene, renderer, mesh;
  
    var onMouseDownMouseX = 0,
      onMouseDownMouseY = 0,
      onMouseDownLon = 0,
      onMouseDownLat = 0,

      lon = 0,  
      lat = 0,   
      phi = 0,
      theta = 0,
      isUserInteracting = false;
  
    var material;

    
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

    var object=THREE.Object3D()

   // placeObjectOnPlanet(object,clientX,clientY,1)
    
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

    
  var onWindowResize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

    useEffect(()=>{

        window.addEventListener("resize", onWindowResize, false);
        canvasContainer.current.addEventListener("mousedown", onMouseDown, false);
        canvasContainer.current.addEventListener("mousemove", onMouseMove, false);
        canvasContainer.current.addEventListener("mouseup", onMouseUp, false);


        camera = new THREE.PerspectiveCamera(
            75, //field of vision
            window.innerWidth / window.innerHeight, //aspect ratio
            1, //min distance from camera
            1100 //max distance from camera
          );
      
       
          camera.target = new THREE.Vector3(0, 0, 0);

          //The focus point of the controls, 
          //the Camera orbits around this.
          // It can be updated manually at any point 
          //to change the focus of the controls.


          
        
      
          scene = new THREE.Scene();
      
/////////////This is a sphere////////////////////
      
          var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
              geometry.scale(-1, 1, 1);
          var texture = new THREE.TextureLoader().load(SampleImage);

                     material = new THREE.MeshBasicMaterial({ map: texture });
                mesh = new THREE.Mesh(geometry, material);

////////////////This is a pointed sphere 
var pointedGeometry=new THREE.CylinderBufferGeometry(2, 0, 10);
var pointedTexture=new THREE.MeshPhongMaterial({color: 0xcc9900});

var pointedMesh=new THREE.Mesh(pointedGeometry,pointedTexture);

pointedMesh.position.set(55, 0, 0); 

//lets insert some form of iframe or stuff here //

//create a div and add iframe inside it 
var div = document.createElement( 'div' );
var videoId="gQSmv4S2-SA";
div.style.width = '480px';
div.style.height = '360px';
div.style.backgroundColor = '#000';
var iframe = document.createElement( 'iframe' );
iframe.style.width = '480px';
iframe.style.height = '360px';
iframe.style.border = '0px';
iframe.src = [ 'https://www.youtube.com/embed/', videoId, '?rel=0' ].join( '' );
div.appendChild( iframe );

var iframeobject = new CSS3DObject( div );
iframeobject.position.set( 200, 0, 0 );
iframeobject.rotation.y = 0;

 
////////////////
//so instead of directly puttin mesh into scene  we first put each of these mesh into 
//parent 3dObject ok ?
var parentObject = new THREE.Object3D();
parentObject.add(pointedMesh)
parentObject.add(mesh)
parentObject.add(iframeobject);



     
 



          scene.add(parentObject);
  
          renderer = new THREE.WebGLRenderer();
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);
      
          canvasContainer.current.appendChild(renderer.domElement);

        
          
      
    
     
      
      
          function animate() {
            //basically a loop forever enjoy !!!
            requestAnimationFrame(animate);
            update();
          }
      
          function update() {

            //so we are basically rotating camera and not the mesh object 
            //how awesome is that so we can store 
            //mesh together //
            //next step would we 
            if (isUserInteracting === false) {
            // lon += 0.1;
              ///  lat += 0.1;
            }



            lat = Math.max(-85, Math.min(85, lat));
            //theta is the angle that  a (points to origin) line  make to its z axis
            //phi is the angle that a (point to origin ) line makes with x-axis 
            // z=rcos0, x=rcos(0)cos(phi) ,y=rcos(0)sin(phi)
            phi = THREE.Math.degToRad(90 - lat);
            theta = THREE.Math.degToRad(lon);
            //camera is directly looking ahead of itself  all the fucking time!!!
      
            //converting spherical coordinates system into 
            //cartesian coordinates 
            camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
            camera.target.y = 500 * Math.cos(phi);
            camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
            
            /*

            Converts the vector from local space to world space.

.lookAt ( vector : Vector3 ) : null
.lookAt ( x : Float, y : Float, z : Float ) : null
vector - A vector representing a position in world space.

Optionally, the x, y and z components of the world space position.

Rotates the object to face a point in world space.

            */
           //where camera needs to look at ?????
             camera.lookAt(camera.target);
            
              //uncomment this to get to a spherical inward pointed sphere
                  // distortion
                //  camera.position.copy( camera.target ).negate();
                  
                //so we need to continouslly call this function  to show something 
                //in the screen
               
            renderer.render(scene, camera);
          }


        //   navigator.geolocation.watchPosition(function (pos) {
        //     var lat = pos.coords.latitude, lon = pos.coords.longitude;
        //     marker.quaternion.setFromEuler(
        //         new THREE.Euler(0, lon * rad, lat * rad, "YZX")); 
        // });
      
          animate(); 
  

        

    },[])

    return (
        <div className="container" ref={canvasContainer}>
      {/* <div className="sampleGallery">{renderListofItems()}</div> */}
    </div>
    )
}
//9411348575 