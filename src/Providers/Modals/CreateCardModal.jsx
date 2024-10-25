import React, { useContext } from 'react'
import { ModalContext } from '../ModalProvider'
import { defaultCode, PlaygroundContext } from '../PlaygroundProvider';
import "./CreatePlaygroundModal.scss"
import { v4 } from 'uuid';

function CreateCardModal() {
    const {closeModal,modalPayload} = useContext(ModalContext);
    const {createPlayground}=useContext(PlaygroundContext);

    const onSubmitModal=(e)=>{
        e.preventDefault();
        console.log("onSubmitModal triggered");
        const fileName = e.target.fileName?.value;
        const language = e.target.language?.value;
        console.log("Collected form data:", { fileName, language })
        const file = {
            id:v4(),
            title:fileName,
            language,
            code:defaultCode[language] || " ",
        }
        console.log("Created file object:", file);


       
        
        createPlayground(modalPayload,file)
        closeModal();
    };





  return (
    <div className='modal-container' >
        <form action="" className='modal-body' onSubmit={onSubmitModal}>
            <span onClick={closeModal} className='material-icons close'>close</span>
            <h1>Create new Playground</h1>
            <div className="item">
                <input type="text" name="fileName" placeholder='enter card title' id="" required/>

            </div>
            <div className="item">
                <select name="language"  required id="">
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                </select>

            </div>
            <button type="submit">Create Playground</button>
        </form>

      
    </div>
  )
}

export default CreateCardModal
