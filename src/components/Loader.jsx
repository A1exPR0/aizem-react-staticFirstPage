import gsap from 'gsap'
import React, { useEffect } from 'react'
import styles from './Loader.module.scss'


function Loader(props) {
    
    useEffect(()=>{
        animateBar();
        window.addEventListener("load", function(event) {
            console.log("All resources finished loading!");
            gsap.to("."+styles.bar,{
                scaleX:1,
                duration:3,
                onComplete:()=>{
                    gsap.to("."+styles.container,{
                        opacity:0,
                        onComplete:()=>{
                            props.mount(false);
                        }
                    })
                }
                
            })
          });
    },[])

    const animateBar=()=>{
        gsap.set("."+styles.bar,{
            transformOrigin:"0 50%",
            scaleX:0,
            opacity:1
        })
        // gsap.to("."+styles.bar,{
        //     scaleX:0.8,
        //     ease:"power4.inOut",
        //     duration:4,
        // })
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