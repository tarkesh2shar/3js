import React,{useEffect,useRef} from 'react';
import * as THREE from 'three';
import Controller from 'three-trackballcontrols';
import {CSS3DRenderer,CSS3DObject} from 'three-css3drenderer' 

import Image1 from '../../../assets/px.jpg';
import Image2 from '../../../assets/nx.jpg';
import Image3 from '../../../assets/py.jpg';
import Image4 from '../../../assets/ny.jpg';
import Image5 from '../../../assets/pz.jpg';
import Image6 from '../../../assets/nz.jpg';


export default function css() {

    const canvasContainer = useRef(null);

    var camera, scene, renderer;
    var target = new THREE.Vector3();
    var lon = 90, lat = 0;
    var phi = 0, theta = 0;
    var touchX, touchY;


    var fovMax = 95,
    fovMin = 5,
    fovTmp = 0;

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        canvasContainer.current.addEventListener( 'mousemove', onDocumentMouseMove, false );
        canvasContainer.current.addEventListener( 'mouseup', onDocumentMouseUp, false );
    }
    function onDocumentMouseMove( event ) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        lon -= movementX * 0.1;
        lat += movementY * 0.1;
    }
    function onDocumentMouseUp( event ) {
        canvasContainer.current.removeEventListener( 'mousemove', onDocumentMouseMove );
        canvasContainer.current.removeEventListener( 'mouseup', onDocumentMouseUp );
    }
    function onDocumentMouseWheel( event ) {

        fovTmp = camera.fov + ((event.deltaY||event.originalEvent.deltaY) * 0.05);
        if (fovTmp >= fovMin && fovTmp <= fovMax) {
          camera.fov = fovTmp;
          camera.updateProjectionMatrix();
        }   
      
    }
    function onDocumentTouchStart( event ) {
        event.preventDefault();
        var touch = event.touches[ 0 ];
        touchX = touch.screenX;
        touchY = touch.screenY;
    }
    function onDocumentTouchMove( event ) {
        event.preventDefault();
        var touch = event.touches[ 0 ];
        lon -= ( touch.screenX - touchX ) * 0.1;
        lat += ( touch.screenY - touchY ) * 0.1;
        touchX = touch.screenX;
        touchY = touch.screenY;
    }


    function animate() {
        requestAnimationFrame( animate );
        console.log(camera.fov)
       // lon +=  0.1;
        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.Math.degToRad( 90 - lat );
        theta = THREE.Math.degToRad( lon );
        target.x = Math.sin( phi ) * Math.cos( theta );
        target.y = Math.cos( phi );
        target.z = Math.sin( phi ) * Math.sin( theta );
        camera.lookAt( target );
        renderer.render( scene, camera );
    }

 
    useEffect(()=>{

        //Get the camera Working 

        camera = new THREE.PerspectiveCamera( 99, window.innerWidth / window.innerHeight, 1, 1000 );
        //make a space 
        scene = new THREE.Scene();
        //choose images on all 6 phases//

        var sides = [
            //x
            {
                url: Image1,
                position: [ - 512, 0, 0 ],
                rotation: [ 0, Math.PI / 2, 0 ]
            },
            {
                url:Image2,
                position: [ 512, 0, 0 ],
                rotation: [ 0, - Math.PI / 2, 0 ]
            },
            //y
            {
                url: Image3,
                position: [ 0, 512, 0 ],
                rotation: [ Math.PI / 2, 0, Math.PI ]
            },
            {
                url: Image4,
                position: [ 0, - 512, 0 ],
                rotation: [ - Math.PI / 2, 0, Math.PI ]
            },
            //z
            {
                url: Image5,
                position: [ 0, 0, 512 ],
                rotation: [ 0, Math.PI, 0 ]
            },
            {
                url:Image6,
                position: [ 0, 0, - 512 ],
                rotation: [ 0, 0, 0 ]
            }
        ];

        for ( var i = 0; i < sides.length; i ++ ) {
            
            var side = sides[ i ];
            var element = document.createElement( 'img' );
            element.width = 1026; // 2 pixels extra to close the gap.
            element.src = side.url;
            var object = new CSS3DObject( element );
            object.position.fromArray( side.position );
            object.rotation.fromArray( side.rotation );
            scene.add( object );
        }

        //lets add few more things to some random Location here and there //

        /**
         * <iframe width="560" height="315" 
         * src="https://www.youtube.com/embed/3EXrDJxJ3VY"
         *  frameborder="0" allow="accelerometer;
         *  autoplay; encrypted-media;
         *  gyroscope; picture-in-picture" 
         * allowfullscreen></iframe>
         * 
         * 
         */

         var iframe =document.createElement("iframe");

         iframe.width="500px";
         iframe.height="500px";
         iframe.src="https://www.youtube.com/embed/3EXrDJxJ3VY";
         iframe.frameBorder="0";
         iframe.allow="accelerometer";

         var object = new CSS3DObject( iframe );

         object.position.fromArray([- 512, 0, 0])
         object.rotation.fromArray([0, Math.PI / 2, 0  ])
         scene.add( object );


         ////////////////////////////////////////////

         var card=document.createElement("div");
         card.className="card";

         var cardImage=document.createElement("img");
         cardImage.src="https://www.w3schools.com/howto/img_avatar.png";
         cardImage.width="500px";
         cardImage.height="500px";


         var cardContainer=document.createElement("div");

         var nameHeading=document.createElement("h4");
         nameHeading.append(document.createTextNode("John Doe"));
         var paraD=document.createElement('p');
         paraD.append(document.createTextNode("Architect & Engineer"));

         cardContainer.appendChild(nameHeading);
         cardContainer.appendChild(paraD);

         card.appendChild(cardImage);
         card.appendChild(cardContainer);


         var object2 = new CSS3DObject( cardImage );

         object2.position.fromArray([512, 0, 0])
         object2.rotation.fromArray([ 0, - Math.PI / 2, 0 ])


         scene.add( object2 );


           
      
        

        renderer = new CSS3DRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
        canvasContainer.current.appendChild( renderer.domElement );
                

        canvasContainer.current.addEventListener( 'mousedown', onDocumentMouseDown, false );
        canvasContainer.current.addEventListener( 'wheel', onDocumentMouseWheel, false );
        canvasContainer.current.addEventListener( 'touchstart', onDocumentTouchStart, false );
        canvasContainer.current.addEventListener( 'touchmove', onDocumentTouchMove, false );
        window.addEventListener( 'resize', onWindowResize, false );


        animate();



    },[])

    return (
        <div className="container" ref={canvasContainer}>
        {/* <div className="sampleGallery">{renderListofItems()}</div> */}
      </div>
    )
}
