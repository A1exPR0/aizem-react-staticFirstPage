import React, { useEffect, useState, useRef, useContext } from 'react'


import Cards from "../components/Cards";
import ServicesToggler from "../components/ServicesToggler";
import ContactForm from '../components/ContactForm';
import NewSlider from "../components/slider/NewSlider";
import TextTest from '../components/TextTest';
import Button from '../components/Button';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

import styles from "./Home.module.scss"

import gsap from 'gsap';
import myContext from '../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

  const arrowD = <FontAwesomeIcon icon={faCaretDown} style={{marginLeft:"0.2em"}}/>

  const sliderDataStatic=[
    {withDesign:"images/pairs/medium_boxes_design_b4ac0717e0.png",noDesign:"images/pairs/medium_boxes_nodesign_60306de0e2.png"},
    {withDesign:"images/pairs/medium_outdoor_Design_b3624bb656.png",noDesign:"images/pairs/medium_outdoor_blank_ffbc047e72.png"},
    {withDesign:"images/pairs/medium_Scene_29_4012c698e6.png",noDesign:"images/pairs/medium_Scene_29_nodesign_e24d8eb0bd.png"},
  ]

const settings={
  sliderInterval:5000, // in ms
  sliderX:100,
  sliderDelay:0.3,
  revealY:50
};

function Home(props) {

const {server,cursor,updateCursor}=useContext(myContext);

const[sliderData,setSliderData]=useState([]);
const [counter,setCounter]=useState(0);

const sliderRef=useRef();
const q = gsap.utils.selector(sliderRef);

const timerID=useRef();

const q2 = gsap.utils.selector(props.appref);

useEffect(()=>{
  // getSliderData();
  
  gsap.fromTo(q2(".page"),{
    opacity:0,
    y:settings.revealY
  },{
      opacity:1,
      y:0
  });

},[])



useEffect(()=>{
  timerID.current=setInterval(()=>{


    gsap.to(q("image"), {
                x: -settings.sliderX,
                opacity: 0,
              onComplete:()=>{
                
                if(counter+1 < sliderDataStatic.length) 
                  {setCounter(counter+1);}
                else
                  {setCounter(0);}
                gsap.fromTo(q("image"), {
                                    x: settings.sliderX,
                                    opacity: 0
                                },{
                                  x:0,
                                  opacity:1,
                                  delay:settings.sliderDelay
                                });        

              }});

  
    },settings.sliderInterval);
    return (()=>{
      clearInterval(timerID.current);
    })
},[counter,sliderData])

const calculateMaskPos=(e)=>{
  updateCursor(e);
  console.log(cursor);
}

  const getSliderData = async() => {
    const ls=localStorage.getItem('SliderData');

    if(ls){
      setSliderData(JSON.parse(ls));
        // console.log("Data for slider set from Local storage");

    }
    else{
        const response = await fetch("http://"+server+":1337/api/home-page?populate=pair.noDesign%2Cpair.withDesign");
        const data = await response.json();
        
        localStorage.setItem('SliderData',JSON.stringify(data.data.attributes.pair));
        // console.log("Data for slider set from api call"); 
        // console.log(data.data.attributes.pair);
        setSliderData(data.data.attributes.pair);
        };
      

}

// console.log(arrow);
  return (
    <div className='page' ref={sliderRef} >
      <div className={styles.section} >
        <TextTest appref={props.appref}/>
        <div className={styles.buttonsTop}>
          <Button href="contacts" type="scroll" styling="orange">Свяжитесь с нами</Button>
          <Button href="cases" type="scroll" styling="white">Наши работы {arrowD}</Button>
        </div>
        <NewSlider sliderData={sliderDataStatic} counter={counter}/>
      </div>
     
     <div className={styles.section} id="cases">
     <h2>Последние Кейсы</h2>
        <Cards appref={props.appref}/>
        <div className={styles.buttonAllWorks}>
        {/* <Button href="#" styling="white">Все работы {arrowR}</Button> */}
        </div>
    </div>
    <div className={styles.section} id="services">
      <h2>Мы делаем</h2>
      <ServicesToggler/>
    </div>
      <Clients>Наши клиенты</Clients>

      <ContactForm>Мы будем рады знакомству</ContactForm>
      <Footer/>
      
    </div>
  ) 
}

export default Home