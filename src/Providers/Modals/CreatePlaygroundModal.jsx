import React, { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
import { ModalConstants } from "../ModalProvider";
function CreatePlaygroundModal() {
  const modalFeatures = useContext(ModalContext);
  const playgroundFeatures = useContext(PlaygroundContext);
  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;


    if (!folderName || !fileName || !language) {
      alert("All fields are required.");
      return;
    }
    playgroundFeatures.CreateNewPlayground({ folderName, fileName, language });

    closeModal();
  };
  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">
          close
        </span>
        <h1 style={{ fontSize: "25px", fontFamily: "fantasy" }}>
          Create New Playground
        </h1>
        <div className="item">
          <p>Enter Folder Name</p>
          <input type="text" name="folderName" required/>
        </div>
        <div className="item">
          <p>Enter Card Name</p>
          <input type="text" name="fileName" required />
        </div>
        <div className="item">
          <select name="language" id="" required>
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <button type="submit">Create Playground</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlaygroundModal;
