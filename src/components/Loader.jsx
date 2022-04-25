import gsap from 'gsap'
import React, { useEffect } from 'react'
import styles from './Loader.module.scss'


function Loader(props) {
    useEffect(()=>{
        let done=false;
        const bars=document.getElementsByClassName(styles.bar);
        console.log("adding load listener nex line");
        window.addEventListener("load", function(event) {
            console.log("All resources finished loading!");
            
            if(!done){
            done=true;    
            gsap.to(bars,{
                scaleX:1,
                duration:2,
                onComplete:()=>{
                    // gsap.to(bars[0],{
                        //     y:"-500px",
                        //     duration:0.5
                        // });
                        // gsap.to(bars[1],{
                            //     y:"500px",
                            //     duration:0.5,
                            //     onComplete:()=>{
                                gsap.to("."+styles.container,{
                                    opacity:0,
                                    duration:0.5,
                                    onComplete:()=>{
                                        props.mount(false);
                                       
                                        console.log("from event");
                                    }
                                })
                            }
                        });
                        
                        
                        // }
                        
                    }});
        setTimeout(()=>{
            if(!done)
            gsap.to(bars,{
                scaleX:1,
                duration:2,
                onComplete:()=>{
                    // gsap.to(bars[0],{
                        //     y:"-500px",
                        //     duration:0.5
                        // });
                        // gsap.to(bars[1],{
                            //     y:"500px",
                            //     duration:0.5,
                            //     onComplete:()=>{
                                gsap.to("."+styles.container,{
                                    opacity:0,
                                    duration:0.5,
                                    onComplete:()=>{
                                        props.mount(false);
                                        console.log("from timeout");
                                        done=true;
                                    }
                                })
                            }
                        });

        },3000)
                    //   });
        animateBar();
    },[])

    const animateBar=()=>{
        gsap.set("."+styles.bar,{
            transformOrigin:"50% 50%",
            scaleX:0,
            opacity:1
        })
        gsap.to("."+styles.bar,{
            scaleX:0.2,
            ease:"power4.inOut",
            duration:0.5,
        })
    }


    
  return (
    <div className={styles.container}>
        <div className={styles.bar}> </div>
        <div className={styles.bar}> </div>
        <h2>Loading</h2>
    </div>
  )
}

export default Loader