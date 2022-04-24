import React, { useEffect } from 'react'


import Cards from "../components/Cards";
import ServicesToggler from "../components/ServicesToggler";
import ContactForm from '../components/ContactForm';
import NewSlider from "../components/slider/NewSlider";
import TextTest from '../components/TextTest';
import Button from '../components/Button';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

import styles from "./Home.module.scss"
import sliderStyles from '../components/slider/NewSlider.module.scss'
import gsap from 'gsap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

  const arrowD = <FontAwesomeIcon icon={faCaretDown} style={{marginLeft:"0.2em"}}/>

  

// const settings={
//   revealY:50
// };

function Home(props) {


//page reveal 
useEffect(()=>{

  const svg=document.querySelectorAll("."+sliderStyles.svg);
  const buttons=document.querySelectorAll("."+styles.buttonsTop)[0].children;
  const headerCases=document.querySelectorAll("#cases>h2");

  if(props.wait)
  {
    gsap.set(svg,{
      opacity:0,
      x:100
    });
    gsap.set(buttons,{
      opacity:0,
      y:50
    });
    gsap.set(headerCases,{
      opacity:0,
      x:-50
    });
    
  }
  else {
    // console.log("reveal slider");
    gsap.to(svg,{
      x:0,
      opacity:1,
      duration:0.5,
      delay:1.5,
      clearProps:"all"
    });
    gsap.to(buttons,{
      y:0,
      opacity:1,
      duration:0.4,
      delay:2,
      stagger:0.3,
      clearProps:"all"
    });
    gsap.to(headerCases,{
      opacity:1,
      x:0,
      delay:4
    });
  }
},[props.wait]);




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
    <div className='page'>
      <div className={styles.sectionFirst} >
        <TextTest appref={props.appref} wait={props.wait}/>
        <div className={styles.buttonsTop}>
          <Button href="contacts" type="scroll" styling="orange">Свяжитесь с нами</Button>
          <Button href="cases" type="scroll" styling="white">Наши работы {arrowD}</Button>
        </div>
        <NewSlider wait={props.wait}/>
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
      <ServicesToggler wait={props.wait}/>
    </div>
      <Clients>Наши клиенты</Clients>

      <ContactForm>Мы будем рады знакомству</ContactForm>
      <Footer/>
      
    </div>
  ) 
}

export default Home