import React from 'react'


function Client(props) {


  return (
    <div onMouseEnter={props.enter} onMouseLeave={props.leave}>
        <img src={props.img} alt={props.name}></img>
    </div>
  )
}

export default Client