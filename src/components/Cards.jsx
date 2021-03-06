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
  {title:"Beenamel",desc:"Из масмаркета в премиум - история перевоплощения не только визуала, но и всей философии ювелирного бренда!",img:"images/works/beenamel_projects.png",badges:["Branding","Brand Strategy"],id:2},
  {title:"Captown",desc:"\"С любовью\" - сингл рэп группы Captown. Музыкальная новелла о любви... к деньгам! Мы не смогли пройти стороной такую тему и сделали для ребят обложку",img:"images/works/captown_projects.jpg",badges:["Graphic Design", "Art Direction"],id:1},
  {title:"ГК СОЮЗ",desc:"Строительный бизнес уступает, наверно, только банкам, в требованиях к надежности в образе компании. Чтобы идти в ногу со временем, крупный застройщик из г. Барнаула обратился к нам за разработкой нового логотипа.",img:"images/works/souz_projects.png",badges:["Logotype","Animation"],id:3},
  {title:"MSS",desc:"Помогли выдающемуся хирургу развить его идею, которая переросла в инновационную школу практических навыков для мед. работников.",img:"images/works/mss_projects.jpg",badges:["Branding","Web Design"],id:4},
  {title:"Lookin Rooms",desc:"9 месяцев контент сопровождения для одного из самых масштабных ночных клубов Москвы. Сделано более 70 афиш и 100 анимаций.",img:"images/works/lookin projects.jpg",badges:["Graphic Design","Motion Design"],id:3},
  {title:"Ycure",desc:"Брендинг и маркетинг стратегия травмотологического отделения, где заботятся о комфорте пациентов",img:"images/works/ycure_projects.jpg",badges:["Branding","Strategy"],id:4},
]

function Cards(props) {
    const [works, setWorks]=useState([]);

    

    useEffect(()=>{
        getWorks();
       
    },[]); 

    useEffect(()=>{
      if(works.length){
        const q2 = gsap.utils.selector(props.appref);
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
  },[works,props.appref]); 
    

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
    {works.map((work, index)=>{
        return(
            <Card 
                key={index} 
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