import React from 'react'
import "./CreateFolderModal.scss"
import { useContext } from 'react';
import { ModalContext } from '../ModalProvider';
import { PlaygroundContext } from '../PlaygroundProvider';


function CreateFolderModal() {
  const {CreateNewFolder} = useContext(PlaygroundContext)
  const modalFeatures = useContext(ModalContext);
  const closeModal = () => {
    modalFeatures.closeModal();
  };
  
  const onSubmitModal = (e) =>{
    e.preventDefault();
    const folderName = e.target.folderName.value;
    CreateNewFolder(folderName)
    // console.log({folderName});
    closeModal()
    
  }
  
  return <div className='modal-container'>
    <form action="" className='modal-body'onSubmit={onSubmitModal}>
        <span onClick={closeModal}   className='material-icons close' >close</span>
        <h1>Create New Folder</h1>
        <div className='field' >
        <input name='folderName'  type="text" placeholder='Enter folder name'/>
        <button type='submit'>Create Folder</button>
        </div>
    </form>
  </div>
}

export default CreateFolderModal



