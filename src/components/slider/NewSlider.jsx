
import styles from './NewSlider.module.scss'
import SliderPair from './SliderPair'
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const settings={
  yCompOffset:1,
  maskRadius:80,
  maskBlockSize:400,
  maskBlur:5,
  sliderInterval:5000, // in ms
  sliderX:100,
  sliderDelay:0.3,
}
const sliderDataStatic=[
  {withDesign:"images/pairs/medium_boxes_design_b4ac0717e0.png",noDesign:"images/pairs/medium_boxes_nodesign_60306de0e2.png"},
  {withDesign:"images/pairs/medium_outdoor_Design_b3624bb656.png",noDesign:"images/pairs/medium_outdoor_blank_ffbc047e72.png"},
  {withDesign:"images/pairs/medium_Scene_29_4012c698e6.png",noDesign:"images/pairs/medium_Scene_29_nodesign_e24d8eb0bd.png"},
]

function NewSlider() {   
  // const sliderRef=useRef();

const [counter,setCounter]=useState(0);

const [setter,setSetter]=useState({});

//component did mount
useEffect(()=>{
  //init setter for mask
  setSetter({
    didMount:true,
    xSet:gsap.quickSetter(document.querySelector("#mask circle"), "x", "px"),
    ySet:gsap.quickSetter(document.querySelector("#mask circle"), "y", "px")
  })
  updateSlider();
  return(()=>{
    setSetter({
      didMount:false
    })
  })
},[]);

//component updated counter
useEffect(()=>{
  if(setter.didMount){
    setTimeout(()=>{
      // console.log("Counter is",counter);
    
      updateSlider();

    },settings.sliderInterval);
  } 
},[counter])
  
  const updateSlider=()=>{
    gsap.to("image", {                
      x: -settings.sliderX,
      opacity: 0,
    onComplete:()=>{
      // console.log("transition complete");
      if(counter+1 < sliderDataStatic.length) 
      {
        // console.log("increase counter");
        setCounter(counter+1);
      }
    else
      {
        // console.log("reset counter");
        setCounter(0);
      }
        gsap.fromTo("image", {
          x: settings.sliderX,
          opacity: 0
      },{
        x:0,
        opacity:1,
        delay:settings.sliderDelay
      });      
    }})
  }

  const calculateMaskPos=(e)=>{
    gsap.to("#mask circle",{opacity:1});
    let elem =e.currentTarget;
    let scrollY=window.pageYOffset;
    let scrollX=window.pageXOffset;
    let offset=elem.getBoundingClientRect();
    setter.xSet(e.pageX-offset.x-scrollX);
    setter.ySet(e.pageY-offset.y-scrollY);
  }

  const fadeMask=()=>{
    gsap.to("#mask circle",{opacity:0})
  }
  const test=false;

 console.log("Slider render");

    return (
    <div>
    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" onMouseMove={calculateMaskPos} onMouseLeave={fadeMask}>
      <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation={settings.maskBlur} />
          </filter>
          <mask id="mask">
            <circle 
                cx={0}
                cy={0}
                fill="white" r={settings.maskRadius} 
                width={settings.maskBlockSize} 
                height={settings.maskBlockSize} 
                filter="url(#mask-blur)" />
          </mask>
      </defs>  
    <SliderPair sliderData={sliderDataStatic} counter={counter}/>
    </svg>
    </div>
  )
}



export default NewSlider