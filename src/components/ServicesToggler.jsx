import React, { useRef, useState } from 'react'
import styles from './ServicesToggler.module.scss'
import Badge from './Badge'
import gsap from 'gsap'

const servicesData=[
  {title:"Branding", content:"-first line<br/>-second line", img:"images/services/Rectangle_45_5f6a0fc144.png",badges:["Beenamel","Ycure"]},
  {title:"Web Design", content:"Another content to write here", img:"images/services/medium_sveta_me2_173496bb22.png",badges:["Overquell","dasBuro"]},
  {title:"Design Sprint", content:"Another content to write here", img:"images/services/medium_bg_about_d565a96c4c.jpg",badges:["Im'OK","Cryptomons"]},
  {title:"Strategy", content:"Another content to write here", img:"images/services/medium_bg_vacancies_41bca8cbc8.jpg",badges:["Beenamel","MSS"]},
  {title:"Graphic Design", content:"Another content to write here", img:"images/services/medium_3_banera_b3644b19c2.png",badges:["Lookin Rooms","Zodiac"]},
]

function SevicesToggler() {
  const contRef=useRef();
  const q=gsap.utils.selector(contRef);

  const [current,setCurrent]=useState(0);

  const changeCurrent = (i)=>{
    //remove old
    if(i!==current){
      gsap.to(q("."+styles.serviceCard),{
        x:50,
        opacity:0,
        onComplete:()=>{
          console.log(i);
          //update current
          setCurrent(i);
          //reveal new
          gsap.fromTo(q("."+styles.serviceCard),{
            x:50,
            opacity:0
          },{
            x:0,
            opacity:1,
            delay:0.3
          })
        }
      })  
    }
  }

  return (
    <div className={styles.wrapper}>
        <div className={styles.buttons}>
          {servicesData.map((el,index)=>{
            return <button key={index}  onClick={(e)=>changeCurrent(index)} className={index==current?styles.buttonActive:styles.button}>{el.title}</button>
          })}
        </div>
        <div className={styles.cardContainer} ref={contRef}>
            <div className={styles.serviceCard}> 
                <div className={styles.serviceInfo}>
                  <h3>{servicesData[current].title}</h3>
                  <div className={styles.content}>{servicesData[current].content}</div>
                  <div className={styles.badges}>
                    {servicesData[current].badges.map((el)=>{
                      return <Badge key={el} styling="green-solid">{el}</Badge>
                    })}
                  
                  </div>
                </div>
                <img src={servicesData[current].img} alt="" />
                
            </div>
        </div>
    </div>
  )
}

export default SevicesToggler