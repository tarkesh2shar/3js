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


    // const debounce = (func, delay) => {
    //     let inDebounce
    //     return function() {
    //       const context = this
    //       const args = arguments
    //       clearTimeout(inDebounce)
    //       inDebounce = setTimeout(() => func.apply(context, args), delay)
    //     }
    //   }


    //   function throttle(callback, delay) {
    //     var timeoutHandler = null;
    //     return function () {
    //         if (timeoutHandler == null) {
    //             timeoutHandler = setTimeout(function () {
    //                 callback();
    //                 clearInterval(timeoutHandler);
    //                 timeoutHandler = null;
    //             }, delay);
    //         }
    //     }
    // }

    function debounce(callback, wait, immediate = false) {
        let timeout = null 
        
        return function() {
          const callNow = immediate && !timeout
          const next = () => callback.apply(this, arguments)
          
          clearTimeout(timeout)
          timeout = setTimeout(next, wait)
      
          if (callNow) {
            next()
          }
        }
      }

    function throttle(callback, wait, immediate = false) {
        let timeout = null 
        let initialCall = true
        
        return function() {
          const callNow = immediate && initialCall
          const next = () => {
            callback.apply(this, arguments)
            timeout = null
          }
          
          if (callNow) { 
            initialCall = false
            next()
          }
      
          if (!timeout) {
            timeout = setTimeout(next, wait)
          }
        }
      }
      
    
    
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

                    <svg onClick={debounce(onLeftClick,300,false)}>
                        <use xlinkHref={`${Sprite}#icon-circle-left`} />
                    </svg>

                    <svg onClick={debounce(onRightClick,300,false)}>
                        <use xlinkHref={`${Sprite}#icon-circle-right`} />
                    </svg>
                    <svg onClick={debounce(onUpClick,300,false)}> 
                        <use xlinkHref={`${Sprite}#icon-arrow-outline-up`} />
                    </svg>

                    <svg onClick={debounce(onDownClick,300,false)}>
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
