import React,{useState} from 'react';
import Sprite from '../../../assets/sprite.svg';
import ImageSlider from './imageSlider';

export default function canvasController({

    onLeftClick,
    onRightClick,
    onZoomDown,
    onZoomUp,
    onUpClick,
    onDownClick,
    chooseNextImage,
    choosePreviousImage,
    arrayOfImages
}) {


    const [isOpen, setisOpen] = useState(false)
    return (
        <div className="canvas__Controller">
            <p className="canvas__para">Feelings comes and go like clouds in a windy sky. - Scene1</p>


            


             <div className="canvas_box">


                    {isOpen?

                    <ImageSlider arrayOfImages={arrayOfImages} />


                :null
               
             }


                 
                <div className="canvas_icon_container">



                <div className="canvas__icon__start">


                    <svg onClick={()=>choosePreviousImage()}>
                        <use xlinkHref={`${Sprite}#icon-undo2`} />
                    </svg>

                    <svg onClick={()=>setisOpen(!isOpen)} >
                        <use xlinkHref={`${Sprite}#icon-menu4`} />
                    </svg>

                </div>

                <div className="canvas__icon__middle">

                    <svg onClick={()=>onLeftClick()}>
                        <use xlinkHref={`${Sprite}#icon-circle-left`} />
                    </svg>

                    <svg onClick={()=>onRightClick()}>
                        <use xlinkHref={`${Sprite}#icon-circle-right`} />
                    </svg>
                    <svg onClick={()=>onUpClick()}> 
                        <use xlinkHref={`${Sprite}#icon-arrow-outline-up`} />
                    </svg>

                    <svg onClick={()=>onDownClick()}>
                        <use xlinkHref={`${Sprite}#icon-arrow-outline-down`} />
                    </svg>
                    <svg onClick={()=>onZoomUp()}>
                        <use xlinkHref={`${Sprite}#icon-plus`} />
                    </svg>

                    <svg onClick={()=>onZoomDown()}>
                        <use xlinkHref={`${Sprite}#icon-minus`} />
                    </svg>
                    <svg>
                        <use xlinkHref={`${Sprite}#icon-360`} />
                    </svg>




                </div>


                <div className="canvas__icon__end">

                    <svg>
                        <use xlinkHref={`${Sprite}#icon-enlarge`} />
                    </svg>

                    <svg>
                        <use xlinkHref={`${Sprite}#icon-shrink2`} />
                    </svg>
                    <svg onClick={()=>chooseNextImage()}>
                        <use xlinkHref={`${Sprite}#icon-redo2`} />
                    </svg>


                </div>




            </div>




             </div>
                
 

           </div>

        
    )
}
