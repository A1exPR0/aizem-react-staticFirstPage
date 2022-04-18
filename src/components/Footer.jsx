import React from 'react'
import styles from './Footer.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faTelegram} from '@fortawesome/free-brands-svg-icons'
import {faBehance} from '@fortawesome/free-brands-svg-icons'
import {faDribbble} from '@fortawesome/free-brands-svg-icons'

function Footer() {
    // const inst=
  return (
    <div className={styles.container}>
        <div className={styles.col}>
            <div>Телефон<br/> <a href='tel:+79959018119'>+7 (995) 901-8119</a></div>
            <div>E-mail <br/><a href="mailto:info@aizem.ru?subject=Давайте%20сделаем%20крутой%20проект">info@aizem.ru</a></div>
        </div>
        <div className={styles.col}>
        {/* <FontAwesomeIcon icon={faInstagram} size="2x" color='#333333'/> */}
        <FontAwesomeIcon icon={faBehance} size="2x" color='#333333'/>
        <FontAwesomeIcon icon={faTelegram} size="2x" color='#333333'/>
        <FontAwesomeIcon icon={faDribbble} size="2x" color='#333333'/>
        </div>

    </div>
  )
}

export default Footer