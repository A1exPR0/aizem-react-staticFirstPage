import gsap from 'gsap'
import React, { useEffect } from 'react'
import styles from './Loader.module.scss'


function Loader(props) {
    
    useEffect(()=>{
        window.addEventListener("load", function(event) {
            console.log("All resources finished loading!");
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
                                    }
                                })
                            }
                        });
                        
                        
                        // }
                        
                    })
                    //   });
        const bars=document.getElementsByClassName(styles.bar);
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

    const animateText=()=>{

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