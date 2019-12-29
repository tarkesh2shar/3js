import React,{useEffect} from 'react';

import * as THREE from "three";
import TWEEN from  '@tweenjs/tween.js';

import  TrackballControls  from 'three-trackballcontrols';
import { CSS3DRenderer, CSS3DObject } from "three-css3drenderer";


export default function periodic() {


    console.log("1",TWEEN,)
    console.log("2",TrackballControls)
    console.log("3",CSS3DRenderer,)
    console.log("4",CSS3DObject)


    var table = [
        "H", "Hydrogen", "1.00794", 1, 1,
        "He", "Helium", "4.002602", 18, 1,
        "Li", "Lithium", "6.941", 1, 2,
        "Be", "Beryllium", "9.012182", 2, 2,
        "B", "Boron", "10.811", 13, 2,
        "C", "Carbon", "12.0107", 14, 2,
        "N", "Nitrogen", "14.0067", 15, 2,
        "O", "Oxygen", "15.9994", 16, 2,
        "F", "Fluorine", "18.9984032", 17, 2,
        "Ne", "Neon", "20.1797", 18, 2,
        "Na", "Sodium", "22.98976...", 1, 3,
        "Mg", "Magnesium", "24.305", 2, 3,
        "Al", "Aluminium", "26.9815386", 13, 3,
        "Si", "Silicon", "28.0855", 14, 3,
        "P", "Phosphorus", "30.973762", 15, 3,
        "S", "Sulfur", "32.065", 16, 3,
        "Cl", "Chlorine", "35.453", 17, 3,
        "Ar", "Argon", "39.948", 18, 3,
        "K", "Potassium", "39.948", 1, 4,
        "Ca", "Calcium", "40.078", 2, 4,
        "Sc", "Scandium", "44.955912", 3, 4,
        "Ti", "Titanium", "47.867", 4, 4,
        "V", "Vanadium", "50.9415", 5, 4,
        "Cr", "Chromium", "51.9961", 6, 4,
        "Mn", "Manganese", "54.938045", 7, 4,
        "Fe", "Iron", "55.845", 8, 4,
        "Co", "Cobalt", "58.933195", 9, 4,
        "Ni", "Nickel", "58.6934", 10, 4,
        "Cu", "Copper", "63.546", 11, 4,
        "Zn", "Zinc", "65.38", 12, 4,
        "Ga", "Gallium", "69.723", 13, 4,
        "Ge", "Germanium", "72.63", 14, 4,
        "As", "Arsenic", "74.9216", 15, 4,
        "Se", "Selenium", "78.96", 16, 4,
        "Br", "Bromine", "79.904", 17, 4,
        "Kr", "Krypton", "83.798", 18, 4,
        "Rb", "Rubidium", "85.4678", 1, 5,
        "Sr", "Strontium", "87.62", 2, 5,
        "Y", "Yttrium", "88.90585", 3, 5,
        "Zr", "Zirconium", "91.224", 4, 5,
        "Nb", "Niobium", "92.90628", 5, 5,
        "Mo", "Molybdenum", "95.96", 6, 5,
        "Tc", "Technetium", "(98)", 7, 5,
        "Ru", "Ruthenium", "101.07", 8, 5,
        "Rh", "Rhodium", "102.9055", 9, 5,
        "Pd", "Palladium", "106.42", 10, 5,
        "Ag", "Silver", "107.8682", 11, 5,
        "Cd", "Cadmium", "112.411", 12, 5,
        "In", "Indium", "114.818", 13, 5,
        "Sn", "Tin", "118.71", 14, 5,
        "Sb", "Antimony", "121.76", 15, 5,
        "Te", "Tellurium", "127.6", 16, 5,
        "I", "Iodine", "126.90447", 17, 5,
        "Xe", "Xenon", "131.293", 18, 5,
        "Cs", "Caesium", "132.9054", 1, 6,
        "Ba", "Barium", "132.9054", 2, 6,
        "La", "Lanthanum", "138.90547", 4, 9,
        "Ce", "Cerium", "140.116", 5, 9,
        "Pr", "Praseodymium", "140.90765", 6, 9,
        "Nd", "Neodymium", "144.242", 7, 9,
        "Pm", "Promethium", "(145)", 8, 9,
        "Sm", "Samarium", "150.36", 9, 9,
        "Eu", "Europium", "151.964", 10, 9,
        "Gd", "Gadolinium", "157.25", 11, 9,
        "Tb", "Terbium", "158.92535", 12, 9,
        "Dy", "Dysprosium", "162.5", 13, 9,
        "Ho", "Holmium", "164.93032", 14, 9,
        "Er", "Erbium", "167.259", 15, 9,
        "Tm", "Thulium", "168.93421", 16, 9,
        "Yb", "Ytterbium", "173.054", 17, 9,
        "Lu", "Lutetium", "174.9668", 18, 9,
        "Hf", "Hafnium", "178.49", 4, 6,
        "Ta", "Tantalum", "180.94788", 5, 6,
        "W", "Tungsten", "183.84", 6, 6,
        "Re", "Rhenium", "186.207", 7, 6,
        "Os", "Osmium", "190.23", 8, 6,
        "Ir", "Iridium", "192.217", 9, 6,
        "Pt", "Platinum", "195.084", 10, 6,
        "Au", "Gold", "196.966569", 11, 6,
        "Hg", "Mercury", "200.59", 12, 6,
        "Tl", "Thallium", "204.3833", 13, 6,
        "Pb", "Lead", "207.2", 14, 6,
        "Bi", "Bismuth", "208.9804", 15, 6,
        "Po", "Polonium", "(209)", 16, 6,
        "At", "Astatine", "(210)", 17, 6,
        "Rn", "Radon", "(222)", 18, 6,
        "Fr", "Francium", "(223)", 1, 7,
        "Ra", "Radium", "(226)", 2, 7,
        "Ac", "Actinium", "(227)", 4, 10,
        "Th", "Thorium", "232.03806", 5, 10,
        "Pa", "Protactinium", "231.0588", 6, 10,
        "U", "Uranium", "238.02891", 7, 10,
        "Np", "Neptunium", "(237)", 8, 10,
        "Pu", "Plutonium", "(244)", 9, 10,
        "Am", "Americium", "(243)", 10, 10,
        "Cm", "Curium", "(247)", 11, 10,
        "Bk", "Berkelium", "(247)", 12, 10,
        "Cf", "Californium", "(251)", 13, 10,
        "Es", "Einstenium", "(252)", 14, 10,
        "Fm", "Fermium", "(257)", 15, 10,
        "Md", "Mendelevium", "(258)", 16, 10,
        "No", "Nobelium", "(259)", 17, 10,
        "Lr", "Lawrencium", "(262)", 18, 10,
        "Rf", "Rutherfordium", "(267)", 4, 7,
        "Db", "Dubnium", "(268)", 5, 7,
        "Sg", "Seaborgium", "(271)", 6, 7,
        "Bh", "Bohrium", "(272)", 7, 7,
        "Hs", "Hassium", "(270)", 8, 7,
        "Mt", "Meitnerium", "(276)", 9, 7,
        "Ds", "Darmstadium", "(281)", 10, 7,
        "Rg", "Roentgenium", "(280)", 11, 7,
        "Cn", "Copernicium", "(285)", 12, 7,
        "Nh", "Nihonium", "(286)", 13, 7,
        "Fl", "Flerovium", "(289)", 14, 7,
        "Mc", "Moscovium", "(290)", 15, 7,
        "Lv", "Livermorium", "(293)", 16, 7,
        "Ts", "Tennessine", "(294)", 17, 7,
        "Og", "Oganesson", "(294)", 18, 7
    ];

    var camera, scene, renderer;
			var controls;
            var objects = [];
            //the following arrays contains information about the position in 3d 
            //of all the 3d cards !!!!!
            var targets = { table: [], sphere: [], helix: [], grid: [] };
            

            function init(){
                        //THIS WORK INDEPENDENT OF SCENE//
                        //setting up camera here!!!!

            camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 3000;
            
            //creating the space 
            scene = new THREE.Scene();
            

                    //looping over above array
				for ( var i = 0; i < table.length; i += 5 ) {

                    //at every loop i becomes i+5; 
                    //create an div with className Element
                    //basically the green div see yet ?
					var element = document.createElement( 'div' );
                    element.className = 'element';
                    //basic style rgba --greenish blue color with opacity as a randomfACTOR
                    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
                    
                    //CREATE another div for number see yet ?
					var number = document.createElement( 'div' );
                    number.className = 'number';

                    /**
                     * 
                     * [
                     * 
        "H", "Hydrogen", "1.00794", 1, 1,
        "He", "Helium", "4.002602", 18, 1,
        "Li", "Lithium", "6.941", 1, 2,..........
                     */
                    
                    number.textContent = ( i / 5 ) + 1;
                    //put inside element div
                    element.appendChild( number );

                    
                    //another div for element Symbol 
					var symbol = document.createElement( 'div' );
                    symbol.className = 'symbol';
                    //symbol like "H"
					symbol.textContent = table[ i ];
                    element.appendChild( symbol );
                    
                    //ANOTHER DIV FOR Remaining details like
                    ///!!! Tungsten and molecular weight !!!!

					var details = document.createElement( 'div' );
					details.className = 'details';
					details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
                    element.appendChild( details );
                     
                    //Now we are doing some not so obvious Stuff!! here !!!
                    // the following line will make our element a 3D div holy shit !!!! //

                    var object = new CSS3DObject( element );
                    //random position at the start thats so awesome !!!!
					object.position.x = Math.random() * 4000 - 2000;
					object.position.y = Math.random() * 4000 - 2000;
                    object.position.z = Math.random() * 4000 - 2000;
                    //look we are populating our space with these 3d divs woww 
                    scene.add( object );
                    //this object is a group of div got it ?????? yes ?????
					objects.push( object );
                    //lets see what following codes does !!!!!


                        //representation in Table ok ???
                    //dont confuse with previous variable object that was a css3dobject!!!

                    //create and push object3d  with its x and y position set into an array called Table
                    var object = new THREE.Object3D();//this is object3d
                    
                    object.position.x = ( table[ i + 3 ] * 140 ) - 1330; // for hydrogen---> -1,118.8884
                    //for Sodium//ok ???????1888.5664
                    object.position.y = - ( table[ i + 4 ] * 180 ) + 990;// for hydrogen---> -1890
                     //for Sodium//ok ??????? - 1890
                        //based on molecular weight !!
                     //So basically putting all metals where they belong  
                     //eg hydrogen and sodium is in first columm  so for them both -1890 px from center
                     //assuming the center is (0 0 0) 

                     //   pushing these objects into a table 
                     //note they dont contain our 3d div yet !!!!
					targets.table.push( object );
                }

                //sPHERE sHAPE
                //creating a sphere shape woww 
                //why vector ????
                //basically we can store a 3 dimesionality number here!!!

                var vector = new THREE.Vector3();
                //nothing fancy create two variables on the go //
                for ( var i = 0, l = objects.length; i < l; i ++ ) {

                   // array containing 3d divs

                    var phi = Math.acos( - 1 + ( 2 * i ) / l );
                    
                    var theta = Math.sqrt( l * Math.PI ) * phi;
                    
                    var object = new THREE.Object3D();

                    //representation of 3dimensional space in spherical coordinates System!!!!!!!!
                    
                    // we need radius.phi and theta ok ???? yes ? so far!!

                    object.position.setFromSphericalCoords( 800, phi, theta );

                    //so we have placed these new 3d object on a sphere of radius 800 ok ??? ok ?? yes

                    //create a vector of positions in x,y,z ok ??? yes!!!
                    vector.copy( object.position ).multiplyScalar( 2 );

                    /**
                     * When you call Object.lookAt( vector ), the object is rotated so that its internal z-axis points toward the target vector.

                      But that is not sufficient to specify the object's orientation, because the object itself can still be "spun" on its z-axis.

                      So the object is then "spun" so that its internal y-axis is in the plane of its internal z-axis and the up vector.

                     The target vector and the up vector are, together, sufficient to uniquely specify the object's orientation.
                     * 
                     * 
                     */

                    
                    object.lookAt( vector );
                    
                    targets.sphere.push( object );
                    
                }
                
                //HELIX

                var vector = new THREE.Vector3();
				for ( var i = 0, l = objects.length; i < l; i ++ ) {
					var theta = i * 0.175 + Math.PI;
					var y = - ( i * 8 ) + 450;
					var object = new THREE.Object3D();
					object.position.setFromCylindricalCoords( 900, theta, y );
					vector.x = object.position.x * 2;
					vector.y = object.position.y;
					vector.z = object.position.z * 2;
					object.lookAt( vector );
					targets.helix.push( object );
                }
                

                	// grid
				for ( var i = 0; i < objects.length; i ++ ) {
					var object = new THREE.Object3D();
					object.position.x = ( ( i % 5 ) * 400 ) - 800;
					object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
					object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
					targets.grid.push( object );
                }


                ///RENDERING Canvas inside container
                
                renderer = new CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.getElementById( 'container' ).appendChild( renderer.domElement );

                /////Lets look at some controls now !!!!!!!!
                //no need to set 10 event listeners  use this inbuild camera control !!!
				controls = new TrackballControls( camera, renderer.domElement );
				controls.minDistance = 500;
				controls.maxDistance = 6000;
				controls.addEventListener( 'change', render );
				var button = document.getElementById( 'table' );
				button.addEventListener( 'click', function () {
					transform( targets.table, 2000 );
				}, false );
				var button = document.getElementById( 'sphere' );
				button.addEventListener( 'click', function () {
					transform( targets.sphere, 2000 );
				}, false );
				var button = document.getElementById( 'helix' );
				button.addEventListener( 'click', function () {
					transform( targets.helix, 2000 );
				}, false );
				var button = document.getElementById( 'grid' );
				button.addEventListener( 'click', function () {
					transform( targets.grid, 2000 );
				}, false );
				transform( targets.table, 2000 );
				//
				window.addEventListener( 'resize', onWindowResize, false );

            }


            function transform( targets, duration ) {
				TWEEN.removeAll();
				for ( var i = 0; i < objects.length; i ++ ) {

					var object = objects[ i ];//all 3d cards ok ?
					var target = targets[ i ];//all position in space of the above card ok ?
					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();
					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();
				}
				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.onUpdate( render )
					.start();
            }
            

            function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				render();
            }
            

            function animate() {
				requestAnimationFrame( animate );
				TWEEN.update();
				controls.update();
			}
			function render() {
				renderer.render( scene, camera );
			}





        useEffect(()=>{

        

			init();
			animate();





        },[])


    return (
     <React.Fragment>
       		<div id="container"></div>
		<div id="menu">
			<button id="table">TABLE</button>
			<button id="sphere">SPHERE</button>
			<button id="helix">HELIX</button>
			<button id="grid">GRID</button>
		</div>
     </React.Fragment>

    )
}
