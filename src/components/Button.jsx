import React from 'react'
import styles from "./Button.module.scss"
import {Link} from "react-scroll";

function Button(props) {
    let style="";

    switch (props.styling) {
        case "orange":
            style=styles.orange;
            break;

        case "white":
            style=styles.white;
            break;
    
        default:
            style=styles.a;
            break;
    }
    
    let isSubmit=false;
    let isScroll=false;

    switch(props.type){
        case "submit":
            isSubmit=true;
            break;
        case "scroll":
            isScroll=true;
            break;
        default:
            isSubmit=false;
            isScroll=false;
    }

  return (
    <div className={styles.wrapper}>
        {isSubmit &&
            <button className={style} type='submit'>{props.children}</button>
        }
        {isScroll &&
            <Link className={style} smooth={true} to={props.href}>{props.children}</Link>
        }
        {!isSubmit && !isScroll &&
            <a href={props.href} target={props.target} className={style} onClick={props.callback}>{props.children} </a>
        }
        <span className={styles.boxunder}>{props.children}</span>
    </div>

  )
}

export default Button 