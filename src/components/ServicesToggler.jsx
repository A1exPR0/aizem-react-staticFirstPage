import React, { useRef, useState } from 'react'
import styles from './ServicesToggler.module.scss'
import Badge from './Badge'
import gsap from 'gsap'

const servicesData=[
  {title:"Branding", content:"\n- Branding Strategy\n- Brandbook\n- Logotype\n- Key Visual\n- Brand Communication", img:"images/services/traveysion_branding.jpg",badges:["Beenamel","Ycure"]},
  {title:"Web Design", content:"\n- User Experience Design\n- User Interface Design\n- Web Developmnet", img:"images/services/dasburo_webdesign.jpg",badges:["Overquell","dasBuro"]},
  {title:"Design Sprint", content:"Быстрый способ решить сложную задачу по методике Google", img:"images/services/design_sprint.jpg",badges:["Im'OK","Cryptomons"]},
  {title:"Graphic Design", content:"\n- Posters\n- Banners\n- Social Media Content\n- POS Materials", img:"images/services/zodiac_graphDesign.jpg",badges:["Lookin Rooms","Zodiac"]},
  {title:"Strategy", content:"\n- Brand Strategy\n- Content Strategy\n- Marketing Strategy", img:"images/services/strategy mem.jpeg",badges:["Beenamel","MSS"]},
]

function SevicesToggler(props) {
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

 const convertMD=(input)=>{
  let arr=input.split("\n");
  const html = React.createElement(
    function content(){
      return(
        <ul style={{margin:0,paddingLeft:"2rem"}}>
          {arr.map((element,index)=>{
            if(element!="")
              if(element.slice(0,2)=="- ")
                return <li key={index}>{element.slice(2,element.length)}</li>
              else
                return <p>{element}</p>
          })}
        </ul>
      )
    }
  );

  return html;
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
                  <div className={styles.content}>{convertMD(servicesData[current].content)}</div>
                  <div className={styles.badges}>
                    {servicesData[current].badges.map((el)=>{
                      return <Badge key={el} styling="green-solid">{el}</Badge>
                    })}
                  
                  </div>
                </div>
                <img src={servicesData[current].img} alt="" />
                
            </div>
        </div>
        {props.wait &&
        <div>
        {servicesData.map((service,index)=>(<img src={service.img} key={index}/>))}
        </div>
        }
    </div>
  )
}

export default SevicesToggler