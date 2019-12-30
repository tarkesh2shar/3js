import React,{useState,useEffect} from 'react';
import Canvas from './canvas';

//Import all images as cube form //
import Image1px from '../../../assets/px.jpg';
import Image1nx from '../../../assets/nx.jpg';
import Image1py from '../../../assets/py.jpg';
import Image1ny from '../../../assets/ny.jpg';
import Image1pz from '../../../assets/pz.jpg';
import Image1nz from '../../../assets/nz.jpg';

import Image2px from '../../../assets/px.png';
import Image2nx from '../../../assets/nx.png';
import Image2py from '../../../assets/py.png';
import Image2ny from '../../../assets/ny.png';
import Image2pz from '../../../assets/pz.png';
import Image2nz from '../../../assets/nz.png';


import Image3px from '../../../assets/px2.png';
import Image3nx from '../../../assets/nx2.png';
import Image3py from '../../../assets/py2.png';
import Image3ny from '../../../assets/ny2.png';
import Image3pz from '../../../assets/pz2.png';
import Image3nz from '../../../assets/nz2.png';



export default function withControls() {

    

    const dataVideoSets=[
        [

            {
                url: Image1px,
                position: [ - 512, 0, 0 ],
                rotation: [ 0, Math.PI / 2, 0 ]
            },
            {
                url:Image1nx,
                position: [ 512, 0, 0 ],
                rotation: [ 0, - Math.PI / 2, 0 ]
            },
            //y
            {
                url: Image1py,
                position: [ 0, 512, 0 ],
                rotation: [ Math.PI / 2, 0, Math.PI ]
            },
            {
                url: Image1ny,
                position: [ 0, - 512, 0 ],
                rotation: [ - Math.PI / 2, 0, Math.PI ]
            },
            //z
            {
                url: Image1pz,
                position: [ 0, 0, 512 ],
                rotation: [ 0, Math.PI, 0 ]
            },
            {
                url:Image1nz,
                position: [ 0, 0, - 512 ],
                rotation: [ 0, 0, 0 ]
            }

        ],
        [

            {
                url: Image2px,
                position: [ - 512, 0, 0 ],
                rotation: [ 0, Math.PI / 2, 0 ]
            },
            {
                url:Image2nx,
                position: [ 512, 0, 0 ],
                rotation: [ 0, - Math.PI / 2, 0 ]
            },
            //y
            {
                url: Image2py,
                position: [ 0, 512, 0 ],
                rotation: [ Math.PI / 2, 0, Math.PI ]
            },
            {
                url: Image2ny,
                position: [ 0, - 512, 0 ],
                rotation: [ - Math.PI / 2, 0, Math.PI ]
            },
            //z
            {
                url: Image2pz,
                position: [ 0, 0, 512 ],
                rotation: [ 0, Math.PI, 0 ]
            },
            {
                url:Image2nz,
                position: [ 0, 0, - 512 ],
                rotation: [ 0, 0, 0 ]
            }

        ],
        [

            {
                url:Image3px,
                position: [ - 512, 0, 0 ],
                rotation: [ 0, Math.PI / 2, 0 ]
            },
            {
                url:Image3nx,
                position: [ 512, 0, 0 ],
                rotation: [ 0, - Math.PI / 2, 0 ]
            },
            //y
            {
                url:Image3py,
                position: [ 0, 512, 0 ],
                rotation: [ Math.PI / 2, 0, Math.PI ]
            },
            {
                url:Image3ny,
                position: [ 0, - 512, 0 ],
                rotation: [ - Math.PI / 2, 0, Math.PI ]
            },
            //z
            {
                url:Image3pz,
                position: [ 0, 0, 512 ],
                rotation: [ 0, Math.PI, 0 ]
            },
            {
                url:Image3nz,
                position: [ 0, 0, - 512 ],
                rotation: [ 0, 0, 0 ]
            }

        ]

    ];

    var arrayOfImages=dataVideoSets.map((imageSet)=>{
        return imageSet[0].url
    })


   // console.log("array",arrayOfImages)

    function chooseNextImage(){

       // alert("das")

       console.log(currentIndex)

        if(currentIndex<dataVideoSets.length-1){

          //  setcurrentIndex(currentIndex+1)
           setcurrentIndex(currentIndex+1);


          setImage(dataVideoSets[currentIndex])
        }
       else{
           //do nothing 
           setcurrentIndex(dataVideoSets.length-1)
       }

    }

    
    function choosePreviousImage(){

      //  alert("previous")

        console.log(currentIndex)
 
         if(currentIndex>=1){
 
           //  setcurrentIndex(currentIndex+1)
            setcurrentIndex(currentIndex-1);
 
 
           setImage(dataVideoSets[currentIndex])
         }
        else{
            //do nothing 
        }
 
     }
    const [currentIndex, setcurrentIndex] = useState(0)

   
    return (
        <div className="canvas_container">

            <Canvas sides={dataVideoSets[currentIndex]} 
            choosePreviousImage={choosePreviousImage}
            chooseNextImage={chooseNextImage}
            arrayOfImages={arrayOfImages}
            />
           
            

            
        </div>
    )
}
 