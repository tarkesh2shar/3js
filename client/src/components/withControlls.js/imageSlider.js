import React from 'react'
import Slide from 'react-slick';



export default function imageSlider({arrayOfImages}) {

    console.log("asdarray",arrayOfImages)

    const properties = {
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
    }


   function renderImagesHere(){

        return arrayOfImages.map(image=>{
            return <div 
            key={image}
            className="canvas_slider_image"
            style={{
                background:`url(/${image})`,
                backgroundSize:"cover",
            }}
            >
                
            </div>
        })


    }

      
    return (
        <div className="canvas_slider">
            <Slide {...properties} >

                 {renderImagesHere()}
              

            </Slide>
        </div>
    )
}
