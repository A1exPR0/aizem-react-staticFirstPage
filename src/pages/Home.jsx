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

  

const settings={
  revealY:50
};

function Home(props) {


  
  



//page reveal
useEffect(()=>{
  // getSliderData();
  
  gsap.fromTo(".page",{
    opacity:0,
    y:settings.revealY
  },{
    opacity:1,
    y:0
  });

},[])




//   const getSliderData = async() => {
//     const ls=localStorage.getItem('SliderData');

//     if(ls){
//       setSliderData(JSON.parse(ls));
//         // console.log("Data for slider set from Local storage");

//     }
//     else{
//         const response = await fetch("http://"+server+":1337/api/home-page?populate=pair.noDesign%2Cpair.withDesign");
//         const data = await response.json();
        
//         localStorage.setItem('SliderData',JSON.stringify(data.data.attributes.pair));
//         // console.log("Data for slider set from api call"); 
//         // console.log(data.data.attributes.pair);
//         setSliderData(data.data.attributes.pair);
//         };
      

// }

// console.log(arrow);
  return (
    <div className='page'  >
      <div className={styles.section} >
        <TextTest appref={props.appref}/>
        <div className={styles.buttonsTop}>
          <Button href="contacts" type="scroll" styling="orange">Свяжитесь с нами</Button>
          <Button href="cases" type="scroll" styling="white">Наши работы {arrowD}</Button>
        </div>
        <NewSlider />
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