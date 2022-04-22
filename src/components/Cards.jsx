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
  {title:"Beenamel",desc:"Ребрендинг на премиум продукцию для друзей - бренда ювелирных изделий из эмали Beenamel",img:"images/works/beenamel_projects.png",badges:["Branding","Brand Strategy"],id:2},
  {title:"Captown",desc:"Обложка для трека",img:"images/works/captown_projects.jpg",badges:["Graphic Design", "Art Direction"],id:1},
  {title:"ГК СОЮЗ",desc:"Разработка нового знака для группы строительных компаний из Сибири",img:"images/works/souz_projects.png",badges:["Logotype","Animation"],id:3},
  {title:"MSS",desc:"Помогли выдающемуся хирургу развить его идею, которая переросла в иноовационную школу практических навыков для мед. работников",img:"images/works/mss_projects.jpg",badges:["Branding","Web Design"],id:4},
  {title:"Lookin Rooms",desc:"Контент сопровождения одного из самых масштабных ночных клубов Москвы",img:"images/works/lookin projects.jpg",badges:["Graphic Design","Motion Design"],id:3},
  {title:"Ycure",desc:"Брендинг и маркетинг стратегия травмотологического отделения, где заботятся о комфорте пациентов",img:"images/works/ycure_projects.jpg",badges:["Branding","Strategy"],id:4},
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