import React, { useEffect, useState } from 'react'
import Card from './Card';

import styles from "./Cards.module.scss"
import gsap from 'gsap';
import cardStyles from "./Card.module.scss"

const settings={
  revealY:50,
  revealStagger:0.3,
  revealDuration:0.8,
  fetchStr:'http://localhost:1337/api/works?populate=cover',
}

const worksData=[
  {title:"Overquell",desc:"Сайт для модного видеопродакшена",img:"images/works/medium_full_9ee951832b.jpg",badges:["Web Design","Development"],id:1},
  {title:"Beenamel",desc:"Ребрендинг на премиум продукцию для друзей - бренда ювелирных изделий из эмали Beenamel",img:"images/works/box1.png",badges:["Branding","Brand Strategy"],id:2},
  {title:"ГК СОЮЗ",desc:"Разработка нового знака для группы строительных компаний из Сибири",img:"images/works/medium_2021_03_01_12_51_59_bb19754675.jpg",badges:["Logotype","Animation"],id:3},
  {title:"MSS",desc:"Помогли выдающемуся хирургу развить его идею, которая переросла в иноовационную школу практических навыков для мед. работников",img:"images/works/medium_oblozhka_youtube_0d566cc7b3.png",badges:["Branding","Web Design"],id:4},
]

function Cards(props) {
    const [works, setWorks]=useState([]);

    const q2 = gsap.utils.selector(props.appref);

    useEffect(()=>{
        getWorks();
       
    },[]); 

    useEffect(()=>{
      if(works.length){

        gsap.fromTo(q2("."+cardStyles.card),{
            opacity:0,
            y:settings.revealY
          },{
              opacity:1,
              y:0,
              stagger:settings.revealStagger,
              duration:settings.revealDuration
          });
      }
  },[works]); 
    

const getWorks = async()=>{
  setWorks(worksData)
    // const ls=localStorage.getItem('WorksData');
    // if(ls){
    //   setWorks(JSON.parse(ls));
    //     // console.log("Data for works set from Local storage");
    //   } 
    // else {
    //   const api=await fetch(settings.fetchStr);
    //   const data=await api.json();
    //   localStorage.setItem('WorksData',JSON.stringify(data.data));
    //   //  console.log("Data for slider set from api call"); 
    // //    console.log("");
    //   setWorks(data.data);
    // }
}

  return (
    <div className={styles.wrapper}>
    {works.map((work)=>{
        return(
            <Card 
                key={work.id} 
                idProp={"card"+work.id}
                description={work.desc} 
                name={work.title} color={"#000000"} 
                src={work.img}
                badges={work.badges}
                badgesStyling={"orange-outline"}            
            
            />
           
        );
    })}
    </div>

  )
}

export default Cards