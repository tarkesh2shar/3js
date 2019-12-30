import React,{useEffect,useRef} from 'react';
import * as THREE from 'three';
import CanvasController from './canvasController';
import {CSS3DRenderer,CSS3DObject} from 'three-css3drenderer';



function Canvas ({sides,chooseNextImage,choosePreviousImage,arrayOfImages}){

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!All variables here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var camera, scene, renderer;
    var target = new THREE.Vector3();
    var lon = 90, lat = 0;
    var phi = 0, theta = 0;
    var touchX, touchY;
    var fovMax = 95,
    fovMin = 5,
    fovTmp = 0;


    const canvasContainer = useRef(null);

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


    function onLeftClick(){

        var oldLongitude=lon;
        var howMuchToMove=20;
      

        var id = setInterval(frame, 25);


        function frame(){
           
            if(lon!=oldLongitude-howMuchToMove)
            {
                lon-=1;

            }
            else{

                clearInterval(id)
                return
            }





        }


        
    


    }

    function onRightClick(){

        var oldLongitude=lon;
        var howMuchToMove=20;

        var id = setInterval(frame, 25);


        function frame(){
           
            if(lon!=oldLongitude+howMuchToMove)
            {
                lon+=1;

            }
            else{

                clearInterval(id)
                return
            }





        }


    }

    function onUpClick(){

        var oldLatitude=lat;
        var howMuchToMove=20;
      

        var id = setInterval(frame, 25);


        function frame(){
           
            if(lat!=oldLatitude+howMuchToMove)
            {
                lat+=1;

            }
            else{

                clearInterval(id)
                return
            }





        }


    }

    function onDownClick(){

        var oldLatitude=lat;
        var howMuchToMove=20;
      

        var id = setInterval(frame, 25);


        function frame(){
           
            if(lat!=oldLatitude-howMuchToMove)
            {
                lat-=1;

            }
            else{

                clearInterval(id)
                return
            }





        }

    

        


    }

    function onZoomUp(){

        //reduce current fov

      

        var oldfov=camera.fov;
        var howMuchToMove=15;

        var id = setInterval(frame, 25);


        
        function frame(){
           
            if(camera.fov!=oldfov-howMuchToMove && camera.fov>0)
            {
                camera.fov-=1;
                camera.updateProjectionMatrix();

            }
            else{

                clearInterval(id)
                return
            }





        }




    }

    function onZoomDown(){


        
        var oldfov=camera.fov;
        var howMuchToMove=15;

        var id = setInterval(frame, 25);


        
        function frame(){
           
            if(camera.fov!=oldfov+howMuchToMove && camera.fov<100)
            {
                camera.fov+=1;
                camera.updateProjectionMatrix();

            }
            else{

                clearInterval(id)
                return
            }





        }


    

        
    }


    function init(){

           //Set intial camera  

           camera = new THREE.PerspectiveCamera( 99, window.innerWidth / window.innerHeight, 1, 1000 );
           //make a space 
           scene = new THREE.Scene();

           //we need to loop at the info array and make 6 sides of cube , so common now !!!!
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

        //make iframe Now ----->
        var iframe =document.createElement("iframe");

        iframe.width="300px";
        iframe.height="300px";
        iframe.src="https://www.youtube.com/embed/3EXrDJxJ3VY";
        iframe.frameBorder="0";
        iframe.allow="accelerometer";

        var object = new CSS3DObject( iframe );

        object.position.fromArray([- 512, 0, 0])
        object.rotation.fromArray([0, Math.PI / 2, 0  ])
        scene.add( object );


        renderer = new CSS3DRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
        canvasContainer.current.appendChild( renderer.domElement );




        /////////////put some event Listeners here //////////////////
        /////////////need to remove it later ////////////////////////
        canvasContainer.current.addEventListener( 'mousedown', onDocumentMouseDown, false );
        canvasContainer.current.addEventListener( 'wheel', onDocumentMouseWheel, false );
        canvasContainer.current.addEventListener( 'touchstart', onDocumentTouchStart, false );
        canvasContainer.current.addEventListener( 'touchmove', onDocumentTouchMove, false );
        window.addEventListener( 'resize', onWindowResize, false );


    }

    function animate(){

        requestAnimationFrame( animate );
       //  console.log(camera.fov)
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

        //initialize here !!!!!

        init()
        animate()


        return()=>{

            //remove all event listners
            canvasContainer.current.removeEventListener( 'mousedown', onDocumentMouseDown, false );
            canvasContainer.current.removeEventListener( 'wheel', onDocumentMouseWheel, false );
            canvasContainer.current.removeEventListener( 'touchstart', onDocumentTouchStart, false );
            canvasContainer.current.removeEventListener( 'touchmove', onDocumentTouchMove, false );
            window.removeEventListener( 'resize', onWindowResize, false );

            //remove the canvasElement

            canvasContainer.current.removeChild(canvasContainer.current.lastChild);

         





        }
        



    })


    return (
        <div className="canvas__container__main" ref={canvasContainer}>
        {/* <div className="sampleGallery">{renderListofItems()}</div> */}
        <CanvasController
         onLeftClick={onLeftClick} 
         onRightClick={onRightClick}
         onZoomDown={onZoomDown}
         onZoomUp={onZoomUp}
         onUpClick={onUpClick}
         onDownClick={onDownClick}
         choosePreviousImage={choosePreviousImage}
         chooseNextImage={chooseNextImage}
         arrayOfImages={arrayOfImages}
         
         />
       
      </div>
    )
}


export default React.memo(Canvas);