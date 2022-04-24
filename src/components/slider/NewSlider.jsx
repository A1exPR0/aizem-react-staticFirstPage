
import styles from './NewSlider.module.scss'
import SliderPair from './SliderPair'
import gsap from 'gsap';
import { useEffect, useState } from 'react';

const settings={
  yCompOffset:1,
  maskRadius:"7vw",
  maskBlockSize:"7vw",
  maskBlur:5,
  sliderInterval:5000, // in ms
  sliderX:100,
  sliderDelay:0.3,
}
const sliderDataStatic=[
  {withDesign:"images/pairs/mss_transporter_design.png",noDesign:"images/pairs/mss_transporter_noDesign.png"},
  {withDesign:"images/pairs/medium_boxes_design_b4ac0717e0.png",noDesign:"images/pairs/medium_boxes_nodesign_60306de0e2.png"},
  {withDesign:"images/pairs/aizem_cup_design.png",noDesign:"images/pairs/aizem_cup_nodesign.png"},
  {withDesign:"images/pairs/traveysion_umbrella_design.png",noDesign:"images/pairs/traveysion_umbrella_nodesign.png"},
  {withDesign:"images/pairs/aizem_markers_design.png",noDesign:"images/pairs/aizem_markers_nodesign.png"},
  {withDesign:"images/pairs/overquell_macbook_design.png",noDesign:"images/pairs/overquell_macbook_nodesign.png"},
  {withDesign:"images/pairs/traveysion_heater_design.png",noDesign:"images/pairs/traveysion_heater_nodesign.png"},
]

function NewSlider(props) {   


const [counter,setCounter]=useState(0);
const [setter,setSetter]=useState({});

//component not waiting
useEffect(()=>{

  //init setter for mask 

  if(!props.wait)
  {setSetter({
    didMount:true,
    xSet:gsap.quickSetter(document.querySelector("#mask circle"), "x", "px"),
    ySet:gsap.quickSetter(document.querySelector("#mask circle"), "y", "px")
  })
  setCounter(1);}
  // updateSlider();
  return(()=>{
    setSetter({
      didMount:false
    })
  })
},[props.wait]);

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

//  console.log("Slider render");

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
                fill="white" 
                r={settings.maskRadius} 
                width={settings.maskBlockSize} 
                height={settings.maskBlockSize} 
                filter="url(#mask-blur)" />
          </mask>
      </defs>  
    <SliderPair sliderData={sliderDataStatic} counter={counter}/>
    </svg>
    {props.wait && 
      <div style={{opacity:0}}>
        {sliderDataStatic.map((pair,index)=>(
           <div key={index}>
           <img src={pair.withDesign} alt=""/>
           <img src={pair.noDesign} alt=""/>
           </div>
        ))}
      </div>}
    </div>
  )
}



export default NewSlider