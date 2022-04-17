
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './NewSlider.module.scss'
import SliderPair from './SliderPair'
import myContext from '../../Context'
import gsap from 'gsap';

const settings={
  yCompOffset:1,
  maskRadius:80,
  maskBlockSize:400,
  maskBlur:5
}

function NewSlider(props) {
  const {server}=useContext(myContext);
   
  // const [cursor,setCursor]=useState({x:0,y:0});

  const svgRef=useRef();
  
  // const [svgHW,setSvgHW]=useState({});
  // useEffect(()=>{
  //   let el=document.querySelector("."+styles.svg);
  //   let elStyles=getComputedStyle(el);
  //   let svgWidth=elStyles.width;
  //   let svgHeight=elStyles.height;
  //   svgHeight=Number(svgHeight.slice(0,svgHeight.length-2));
  //   svgWidth=Number(svgWidth.slice(0,svgWidth.length-2));
  //   // setSvgHW({w:svgWidth,h:svgHeight});
  // },[]);

  // const viewWidth=window.visualViewport.width;
  // const viewHeight=window.visualViewport.height;
  const mask = document.querySelector("#mask circle");  
const xSet = gsap.quickSetter(mask, "x", "px");
const ySet = gsap.quickSetter(mask, "y", "px");

  const calculateMaskPos=(e)=>{
    gsap.to("#mask circle",{opacity:1});
    // setCursor({x:e.pageX,y:e.pageY});
    let elem =e.currentTarget;
    // let elem = new HTMLElement;
    let scrollY=window.pageYOffset;
    let scrollX=window.pageXOffset;
    let offset=elem.getBoundingClientRect();
    // console.log(offset.x,offset.y);
    // gsap.to("#mask circle",{
    //   x:e.pageX-offset.x,
    //   y:e.pageY-offset.y,
    //   duration:0.05
    // })
    xSet(e.pageX-offset.x-scrollX);
    ySet(e.pageY-offset.y-scrollY);
  }

  const fadeMask=(e)=>{
    // console.log(e.pageX, e.pageY);
    gsap.to("#mask circle",{opacity:0})
  }
  const test=false;

 console.log("Slider render");

    return (
    <div>
        {/* {test &&  <div  className="test">
        <p>cursor is {cursor.x} and {cursor.y}</p>
        <p>server is {server}</p>
        <p>counter is {props.counter}</p>
        <p>ViewPort is {viewWidth} and {viewHeight}</p>
        </div>} */}

    <svg ref={svgRef} className={styles.svg} xmlns="http://www.w3.org/2000/svg" onMouseMove={calculateMaskPos} onMouseLeave={fadeMask}>
      <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation={settings.maskBlur} />
          </filter>
          <mask id="mask">
            <circle 
                cx={0}
                cy={0}
                // cx={cursor.x-(viewWidth-(svgHW.w!==undefined?svgHW.w:0))} 
                // cy={cursor.y-(viewHeight*settings.yCompOffset-(svgHW.h!==undefined?svgHW.h:0))} 
                // style={{top:cursor.y,left:cursor.x}}
                fill="white" r={settings.maskRadius} 
                width={settings.maskBlockSize} 
                height={settings.maskBlockSize} 
                filter="url(#mask-blur)" />
          </mask>
      </defs>  

      
    <SliderPair sliderData={props.sliderData} counter={props.counter}/>
    </svg>
    </div>
  )
}



export default NewSlider