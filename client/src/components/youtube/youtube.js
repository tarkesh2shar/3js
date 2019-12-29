import React,{useEffect} from 'react';

import * as THREE from 'three';

import  TrackballControls from 'three-trackballcontrols';
import { CSS3DRenderer, CSS3DObject } from 'three-css3drenderer';


export default function youtube() {

    var camera, scene, renderer;
    var controls;

    function init() {
        var container = document.getElementById( 'container' );

        //set up the camera

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
        //camera position in space
        camera.position.set( 500, 350, 750 );
        //camera.position.set( -100, 100, -100 );


        //space create
        scene = new THREE.Scene();

        //we need a css renderer 

        renderer = new CSS3DRenderer();
        //usual stuff here 
        renderer.setSize( window.innerWidth, window.innerHeight );
        //add canvas inside container
        container.appendChild( renderer.domElement );
        ///////////////////////////Something new Here!!!///////////////////////
        var group = new THREE.Group();

        //create a group and add the two cubes
       //These cubes can now be rotated / scaled etc as a group

        group.add( new Element( 'SJOz3qjfQXU', 0, 0, 240, 0 ) );
        group.add( new Element( 'Y2-xZ-1HE-Q', 240, 0, 0, Math.PI / 2 ) );
        group.add( new Element( 'IrydklNpcFI', 0, 0, - 240, Math.PI ) );
        group.add( new Element( '9ubytEsCaS0', - 240, 0, 0, - Math.PI / 2 ) );
        //add everything inside scene
        scene.add( group );

        ///camera controls here nothing new woww so wonderful !!!!
        controls = new TrackballControls( camera, renderer.domElement );
        controls.rotateSpeed = 4;
        window.addEventListener( 'resize', onWindowResize, false );
        // Block iframe events when dragging camera
        var blocker = document.getElementById( 'blocker' );
        blocker.style.display = 'none';

        controls.addEventListener( 'start', function () {
            blocker.style.display = '';
        } );
        controls.addEventListener( 'end', function () {
            blocker.style.display = 'none';
        } );
    }

    var Element = function ( id, x, y, z, ry ) {
        var div = document.createElement( 'div' );
        div.style.width = '480px';
        div.style.height = '360px';
        div.style.backgroundColor = '#000';
        var iframe = document.createElement( 'iframe' );
        iframe.style.width = '480px';
        iframe.style.height = '360px';
        iframe.style.border = '0px';
        iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
        div.appendChild( iframe );
        //create a new CSS3D object/////////////////
        var object = new CSS3DObject( div );
        object.position.set( x, y, z );
        object.rotation.y = ry;
        return object;
    };

    function animate() {
        requestAnimationFrame( animate );
        controls.update();//at every frame  update the camera control !!!!
        renderer.render( scene, camera );
    }

    function onWindowResize() {
        //whenever window get resized  update the camera and renderer dimensions 
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }


    useEffect(()=>{

        init();
			animate();


    })

    return (
       <React.Fragment>

<div id="container"></div>
		<div id="blocker"></div>

       </React.Fragment>
    )
}
