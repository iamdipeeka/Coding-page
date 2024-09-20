import React, { useContext } from 'react'
import "./Index.scss"
import RightComponent from './Rightcomponent/Index'
import { Modal } from '../../Providers/Modals/Modal'
import { ModalContext } from '../../Providers/ModalProvider';
import { ModalConstants } from '../../Providers/ModalProvider';

function Homescreen() {
  const modalFeatures = useContext(ModalContext);
  const OpenCreatePlaygroundModal = () =>{
         modalFeatures.openModal(ModalConstants.CREATE_PLAYGROUND);
  };
  return (
    <div className='home-container'>
      
      <div className='left-container'>
        
        <div className="item-container">
        <img src="logoCP.png" />
        <h1>VoiletIDE</h1>
        <h2>Code.Learn.Build.</h2>
        <button onClick={OpenCreatePlaygroundModal}> 
            <span className='materialicon'>+</span>
            <span>Create Playground</span>
        </button>
        </div>
      </div>
      <RightComponent/>
      <Modal/>
    </div>
  )
}

export default Homescreen