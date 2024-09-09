import React from 'react'
import "./Index.scss"
import RightComponent from './Rightcomponent/Index'


function Homescreen() {
  return (
    <div className='home-container'>
      
      <div className='left-container'>
        
        <div className="item-container">
        <img src="logoCP.png" />
        <h1>VoiletIDE</h1>
        <h2>Code.Learn.Build.</h2>
        <button>
            <span className='materialicon'>+</span>
            <span>Create Playground</span>
        </button>
        </div>
      </div>
      <RightComponent/>
    </div>
  )
}

export default Homescreen
