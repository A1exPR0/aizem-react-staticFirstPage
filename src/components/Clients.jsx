import styles from './Clients.module.scss'
import React, { useRef } from 'react'
import Client from './Client'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin'

function Clients(props) {
    const clients=[
        {name:"Beenamel",logo:"/images/clients/BnmlLogo.svg",mask:"images/clients/Bnml.svg"},
        {name:"Zodiac",logo:"/images/clients/ZodiacLogo.svg",mask:"images/clients/Zodiac.svg"},
        {name:"Lookin Rooms",logo:"/images/clients/LookinLogo.svg",mask:"images/clients/Lookin.svg"},
        {name:"Lawyer Pro",logo:"/images/clients/LawyerLogo.svg",mask:"images/clients/Lawyer.svg"},
        {name:"MSS",logo:"/images/clients/BnmlLogo.svg",mask:"images/clients/Mss.svg"},
        {name:"Protancy",logo:"/images/clients/ZodiacLogo.svg",mask:"images/clients/Protancy.svg"},
        {name:"ГК СОЮЗ",logo:"/images/clients/LookinLogo.svg",mask:"images/clients/Souz.svg"},
        {name:"Symposy",logo:"/images/clients/LawyerLogo.svg",mask:"images/clients/Symposy.svg"},
        {name:"Syndicart",logo:"/images/clients/LawyerLogo.svg",mask:"images/clients/Synd.svg"},
        {name:"Ycure",logo:"/images/clients/LawyerLogo.svg",mask:"images/clients/Ycure.svg"}
    ]
    
    const nameRef=useRef();
    const q=gsap.utils.selector(nameRef);
    gsap.registerPlugin(TextPlugin);
    const showName=(name)=>{
        // nameRef.current.innerHTML=name;
        gsap.to(nameRef.current,{
            opacity:1,
            y:0,
            text:name
        })
    }
    
    const hideName=()=>{
        // console.log("hide name");
        gsap.to(nameRef.current,{
            opacity:0,
            y:"-100%",
            duration:0.2,
            onComplete:()=>{gsap.set(nameRef.current,{
                y:"100%",
                text:"****",

            })

            }
        })
    }

  return (
    <div>
        <h2 className={styles.header}>{props.children}</h2>
        <h3 className={styles.clientName} ref={nameRef}>client</h3>
        <div className={styles.grid}>
            {clients.map((client,index)=>(
                <Client key={index} leave={()=>hideName()} enter={()=>showName(client.name)} img={client.mask} 
                ></Client>
            ))}
        </div>
    </div>
  )
}

export default Clients