import React, { useContext } from 'react'
import "./CreateFolderModal"
import { ModalContext } from '../ModalProvider'
import { PlaygroundContext } from '../PlaygroundProvider'
export function UpdateFolderTitleModal() {

  const {closeModal,modalPayload} = useContext(ModalContext)

  const {editFolderTitle}=useContext(PlaygroundContext)

  const onSubmitModal=(e)=>{
    e.preventDefault()
    const folderName= e.target.folderName.value
    editFolderTitle(folderName,modalPayload)
    closeModal()
  }

  return (
    <div className='modal-container'>
    <form action="" className='modal-body' onSubmit={onSubmitModal}>
        <span onClick={closeModal}   className='material-icons close' >close</span>
        <h1>Update Folder title</h1>
        <div className='field' >
        <input required name='folderName'  type="text" placeholder='Enter folder name'/>
        <button type='submit' >update Title</button>
        </div>
    </form>
  </div>
  )
}


