import { useContext } from "react";
import { ModalConstants, ModalContext } from "../ModalProvider";
import CreatePlaygroundModal from "./CreatePlaygroundModal";
import { ModalProvider } from "../ModalProvider";
import CreateFolderModal from "./CreateFolderModal";
import { UpdateFolderTitleModal } from "./UpdateFolderTitleModal";
import UpdateFileTitleModal from "./UpdateFileTitleModal";

export const Modal = () => {
  const modalFeatures = useContext(ModalContext);

  return (
    <>
      {modalFeatures.activeModal === ModalConstants.CREATE_PLAYGROUND && (
        <CreatePlaygroundModal />
      )}
      {modalFeatures.activeModal === ModalConstants.CREATE_FOLDER && (
        <CreateFolderModal />
      )}
      {modalFeatures.activeModal===ModalConstants.UPDATE_FOLDER_TITLE &&(<UpdateFolderTitleModal/>)}
      {modalFeatures.activeModal===ModalConstants.UPDATE_FILE_TITLE &&(<UpdateFileTitleModal/>)}
    </>
  );
};
