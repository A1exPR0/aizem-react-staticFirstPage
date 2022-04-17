import React, { useEffect, useState,useContext } from 'react'
import styles from "./SliderPair.module.scss"
import myContext from '../../Context'

function SliderPair(props) {

  
    return (
        <g>
            {(props.sliderData.length>0) &&
            <>
            <image className={styles.slider_pair__image} xlinkHref={props.sliderData[props.counter].noDesign}  x="0" y="0"></image>    
            <image className={styles.slider_pair__image} xlinkHref={props.sliderData[props.counter].withDesign} mask="url(#mask)" x="0" y="0"></image>  
            </>
            }
        </g>
    )
}
export default SliderPair;
