import React, { useContext } from "react";
import "./Index.scss";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { ModalContext,ModalConstants } from "../../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";




const Folder = ({ foldertitle, cards,folderId }) => {
  const {deleteFolder,deleteFile} = useContext(PlaygroundContext)
   const {openModal,setModalPayload} = useContext(ModalContext)
  
   const navigate = useNavigate()


  const onDeleteFolder =()=>{
     deleteFolder(folderId)
  }

  const onEditFolderTitle=()=>{
    setModalPayload(folderId)
     openModal(ModalConstants.UPDATE_FOLDER_TITLE)
  }

  const openCreateCardModal =()=>{
    setModalPayload(folderId)
    openModal(ModalConstants.CREATE_CARD)
  }
  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons" style={{ color: "#FFCA29" }}>
            folder
          </span>
          <span>{foldertitle}</span>
        </div>
        <div className="folder-header-item">
          <span className="material-icons" onClick={onDeleteFolder}>delete</span>
          <span className="material-icons" onClick={onEditFolderTitle}>edit</span>
          <button onClick={openCreateCardModal}>
            <span className="material-icons">add</span>
            <span>New Playground</span>
          </button>
        </div>
      </div>
      <div className="card-container">
        {cards?.map((file, index) => {
           const onEditFile = ()=>{
               setModalPayload({fileId:file.id,folderId:folderId})
               openModal(ModalConstants.UPDATE_FILE_TITLE)
           }


           const onDeleteFile = ()=>{
              deleteFile(folderId,file.id)
           }

         
          const navigateToPlaygroundScreen = (file, folderId) => {
           
                console.log({ fileId:file.id, folderId});
                //navigate to that screen by passing file id and folder id;
                navigate(`/playground/${file.id}/${folderId}`)
            
        };
        
          return (
            <div className="card" key={index} onClick={() => navigateToPlaygroundScreen(file, folderId)} >
              <img src="logoCP.png" alt="" />
              <div className="title-container">
                <span>{file?.title}</span>
                <span>Language:{file?.language}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <span className="material-icons" onClick={onDeleteFile}>delete</span>
                <span className="material-icons" onClick={onEditFile}>edit</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function RightComponent() {
  const {folders} = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext)
  const OpenCreateNewFolderModal = ()=>{
      modalFeatures.openModal(ModalConstants.CREATE_FOLDER);
  }

  return (
    <div className="right-container">
      <div className="header">
        <div className="title">
          <span>My</span> Playground
        </div>
        <button className="add-folder" onClick={OpenCreateNewFolderModal}>
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>
      {folders?.map((folder, index) => {
        return (
          <Folder
            foldertitle={folder?.title}
            cards={folder?.files}
            key={index}
            folderId={folder.id}
          />
        );
      })}
    </div>
  );
}

export default RightComponent;
