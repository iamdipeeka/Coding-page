import { useContext } from "react";
import { ModalConstants, ModalContext } from "../ModalProvider";
import CreatePlaygroundModal from "./CreatePlaygroundModal";
import { ModalProvider } from "../ModalProvider";
import CreateFolderModal from "./CreateFolderModal";
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
    </>
  );
};
