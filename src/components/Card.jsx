import styles from './Card.module.scss'
import Badge from './Badge';
import {gsap} from "gsap"


const settings={
  alphaMult:0.3,
  minY:-15,
  maxY:15,
  minX:-7,
  maxX:7,
  rotateDuration:0.15, // in s
  rotateFactor:100,
  rotateDelay:0.1,   // in s
  restoreTimeOut:200, // in ms
  restoreDuration:2   // in s

}

function Card(props) {

  const updateRotation = function(e) {
    // console.log("update roatation");

    // console.log("Current target is: ",e.currentTarget);

    // const card=new HTMLElement//: e.currentTarget;
    const card=e.currentTarget;

    var pageX = e.pageX;//clientX;//
    var pageY = e.pageY;//clientY;//
    // console.log(pageX,pageY);

    let box=card.getBoundingClientRect();
    // console.log(box.x,box.y);

    let scrollX=window.pageXOffset;
    let scrollY=window.pageYOffset;
    // console.log("scroll: ",scrollX,scrollY);

    //размеры карточки
    var itemW = card.clientWidth;
		var itemH = card.clientHeight;
    // console.log("size: "+itemW,itemH);

    var itemX = box.x+scrollX;//itemContainer.offsetLeft+itemContainer.offsetParent.offsetLeft;
    var itemY = box.y+scrollY;//itemContainer.offsetTop+itemContainer.offsetParent.offsetTop;
    // console.log("coordintes: "+itemX,itemY);

    //  процент смещения курсора по карточки от -1 до 1
		var percentX = (pageX-itemX)/itemW*100;//-17;
		var percentY = (pageY-itemY)/itemH*100;//-25;
    percentX=(percentX-50)/50;
    percentY=(percentY-50)/50;
    // console.log("precents: "+percentX,percentY);


    let factorX=5;
    let factorY=-12;

    let rotateX=percentY*factorX;
    let rotateY=percentX*factorY;

    let light;
    let dark;
    
    for(let i=0;i<card.children.length;i++){
      switch (card.children[i].className) {
        case styles.light:
          light=card.children[i];
          break;
        case styles.dark:
          dark=card.children[i];
          break;
      
        default:
          break;
      }
    } 
    // console.log(light,dark);
    
    // console.log(card.classList.contains(styles.card));

    gsap.to(card,{
                          rotateX:rotateX,
                          rotateY:rotateY,
                          x:percentX*-factorX/2,
                          translateZ:5,
                          ease:"none",
                          duration:settings.rotateDuration,
                          delay:settings.rotateDelay,
                          boxShadow:(percentX+1)*factorY+"px "+(percentY-1)*-factorX+"px "+(percentX+1.2)*6+"px 0px rgba(0, 0, 0, 0.15)",
                          // onComplete:console.log("rotated")
                        });
        gsap.to(dark,{
                          y:itemH/2,
                          x:((percentX-50)-pageX),
                          opacity:1,
                          // background:bg
                        });
        gsap.to(light,{
                          y:itemH/2,
                          x:pageX*1.4-itemW,
                          opacity:1,
                          // background:bg
                        }); 
  }
  
function restoreCard(e){
  // console.log("restore rotation");
  const card=e.currentTarget;
  let light;
  let dark;
  
  for(let i=0;i<card.children.length;i++){
    switch (card.children[i].className) {
      case styles.light:
        light=card.children[i];
        break;
      case styles.dark:
        dark=card.children[i];
        break;
    
      default:
        break;
    }
  } 

  setTimeout(
    ()=>{
      gsap.to(card,{
        rotateX:0,
        rotateY:0,
        rotateZ:0,
        x:0,
        translateZ:0,
        ease:"power.out",
        duration:settings.restoreDuration,
        boxShadow:"5px 5px 10px rgba(0,0,0,0.15)"
      });
      gsap.to(light,{opacity:0});
      gsap.to(dark,{opacity:0});
    }
    ,settings.restoreTimeOut);

}


  return (
    <div className={styles.container}>
       <div  id={props.idProp}  className={styles.card} onMouseMove={updateRotation} onMouseEnter={updateRotation} onMouseLeave={restoreCard}> 
        <img className={styles.pic} src={props.src} alt="" />
        <div className={styles.info}>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <div className={styles.badges}>
            {props.badges.map((element)=>(
            <Badge 
              key={element} 
              styling={props.badgesStyling}>
                {element}
            </Badge>))}
          </div>
        </div>
        <div className={styles.light}></div> 
        <div className={styles.dark}></div> 
      </div>
    </div>
  )
}

export default Card





// console.log(styles);

// class Card extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={
//       x:0,
//       y:0
//     }
//     this.ref1=React.createRef();
//     this.ref2=React.createRef();
//     this.q=gsap.utils.selector(this.ref1);
//   }

// updateRotation=(e)=>{

//     let itemContainer=e.currentTarget;
//     // console.log(e);

//     // положение курсора в документе
//     var pageX = e.pageX;//clientX;//
// 		var pageY = e.pageY;//clientY;//
//     // console.log(pageX,pageY);
   
    
//     //положение карточки
//     let box=itemContainer.getBoundingClientRect();
//     // console.log(box.x,box.y);
//     let windowX=window.pageXOffset;
//     let windowY=window.pageYOffset;
//     var itemX = box.x+windowX;//itemContainer.offsetLeft+itemContainer.offsetParent.offsetLeft;
// 		var itemY = box.y+windowY;//itemContainer.offsetTop+itemContainer.offsetParent.offsetTop;
//     console.log("coordintes: "+itemX,itemY);
		
//     //размеры карточки
//     var itemW = itemContainer.clientWidth;
// 		var itemH = itemContainer.clientHeight;
//     console.log("size: "+itemW,itemH);

//     //процент смещения курсора по карточки от -1 до 1
// 		var percentX = (pageX-itemX)/itemW*100;//-17;
// 		var percentY = (pageY-itemY)/itemH*100;//-25;
//     percentX=(percentX-50)/50;
//     percentY=(percentY-50)/50;
//     console.log("precents: "+percentX,percentY);


//     let factorX=10;
//     let factorY=20;

//     let rotateX=percentY*factorX;
//     let rotateY=percentX*factorY;

//     // let diffY = settings.minY-settings.maxY; // -30
// 		// var rotateY = settings.minY-percentX/settings.rotateFactor*diffY;
//     // rotateY = rotateY<settings.maxY ? settings.maxY : rotateY;
//     // rotateY = rotateY>settings.minY ? settings.minY : rotateY;

// 	  // let diffX = settings.minX-settings.maxX;
// 		// var rotateX = settings.minX-percentY/settings.rotateFactor*diffX;
//     // rotateX = rotateX<settings.minX ? settings.minX : rotateX;
//     // rotateX = rotateX>settings.maxX ? settings.maxX : rotateX;
   
//     console.log("rotate: "+rotateX,rotateY);
//     let bg="";
//     let alpha=Math.abs(percentX)*settings.alphaMult;
    
//     // if(percentX>50) bg="radial-gradient(circle at center, rgba(0, 0, 0, "+alpha+"), transparent 50%)";
//     // else bg="radial-gradient(circle at center, rgba(255, 255, 255, "+alpha+"), transparent 50%)";
//     // bg="red";
//     // console.log(this.q("."+styles.dark));
//     // if(percentX<45 && percentX>-45 && percentY<45 && percentY>-45)
//     // console.log("#"+this.props.idProp);
//     const animTarget=this.q("#"+this.props.idProp);
//     console.log("target: ",animTarget);
//     gsap.to(animTarget,{
//                       rotateX:rotateX,
//                       rotateY:rotateY,
//                       x:percentX*-factorX/2,
//                       translateZ:5,
//                       ease:"none",
//                       duration:settings.rotateDuration,
//                       delay:settings.rotateDelay,
//                       boxShadow:(percentX+1)*factorY+"px "+(percentY-1)*-factorX+"px "+(percentX+1.2)*6+"px 0px rgba(0, 0, 0, 0.15)"
//                     });
//     gsap.to(animTarget,{
//                       y:itemH/2,
//                       x:((percentX-50)-pageX),
//                       opacity:1,
//                       background:bg
//                     });
//     gsap.to(animTarget,{
//                       y:itemH/2,
//                       x:itemW-pageX,
//                       opacity:1,
//                       background:bg
//                     });
//     // gsap.to(this.q("."+styles.pic[0]),{
//     //                   y:percentY*factorX/-2,
//     //                   x:percentX*factorY/2.5,
//     //                   // skewX:-percentX/3.5,
//     //                   // skewY:percentY/3.5,
//     //                   scale:1.02,
//     //                   transformOrigin:"100% 50%",
//     //                   // boxShadow:"0px 0px 5px 0px inset rgba(0,0,0,0.4)"
//     //                 });                

// } 

// restoreCard(){
//   setTimeout(
//     ()=>{
//       gsap.to(this.q("."+styles.card),{
//         rotateX:0,
//         rotateY:0,
//         rotateZ:0,
//         ease:"power.out",
//         duration:settings.restoreDuration,
//         boxShadow:"5px 5px 10px rgba(0,0,0,0.15)"
//       });
//       gsap.to(this.q("."+styles.light),{opacity:0});
//       gsap.to(this.q("."+styles.dark),{opacity:0});
//       gsap.to(this.q("."+styles.pic),{
//         y:0,
//         x:0,
//         skewX:0,
//         skewY:0,
//         scale:1,
//         // boxShadow:"",
//         transformOrigin:"50% 50%",
//       });
//     }
//     ,settings.restoreTimeOut);
// }

// render(){
//   return (
   
//     <div ref={this.ref1} className={styles.container}>
//       <div  id={this.props.idProp}  ref={this.ref2} className={styles.card}  
//             onMouseLeave={()=>this.restoreCard()} 
//             onMouseMove={this.updateRotation}> 
//         <img className={styles.pic} src={this.props.src} alt="" />
//         <div className={styles.info}>
//           <h2>{this.props.name}</h2>
//           <p>{this.props.description}</p>
//           <div className={styles.badges}>
//             {this.props.badges.map((element)=>(
//             <Badge 
//               key={element} 
//               styling={this.props.badgesStyling}>
//                 {element}
//             </Badge>))}
//           </div>
//         </div>
//         <div className={styles.light}></div> 
//         <div className={styles.dark}></div> 
//       </div>
//     </div>
   
//   )
// }
// }

// export default Card

// import React from 'react'