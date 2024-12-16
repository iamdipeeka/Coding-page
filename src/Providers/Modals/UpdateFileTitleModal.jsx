import { useContext } from "react"
import "./CreateFolderModal.scss"
import { ModalContext } from "../ModalProvider"
import { PlaygroundContext } from "../PlaygroundProvider";
import "./createPlaygroundModal.scss"
 const UpdateFileTitleModal=()=>{
    const {closeModal,modalPayload} = useContext(ModalContext);
    const {editFileTitle}=useContext(PlaygroundContext)
    const onSubmitModal=(e)=>{
        e.preventDefault();
        

        const fileName = e.target.elements.fileName.value; 
         editFileTitle(fileName  , modalPayload.folderId , modalPayload.fileId)
         closeModal()
    }


    return <div className='modal-container'>
        <form action="" className='modal-body' onSubmit={onSubmitModal}>
        <span onClick={closeModal}   className='material-icons close' >close</span>
        <h1>Update Card title</h1>
        <div className='field' >
        <input required name='fileName'  type="text" placeholder='Enter file name'/>
        <button type='submit' >update Title</button>
        </div>
    </form>
    </div>
}


export default UpdateFileTitleModal