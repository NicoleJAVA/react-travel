import React, { ComponentType, useState } from 'react';
import { Modal as AntModal } from 'antd';

export interface ModalProps {
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
}

const withModal = <P extends object>(WrappedComponent: ComponentType<P & ModalProps>) => {
  const EnhancedComponent: React.FC<P> = (props) => {
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const [isShow, setIsShow] = useState<boolean>(false);

    const openModal = (content: JSX.Element) => {
      setIsShow(true);
      setModalContent(content);
    };

    const closeModal = () => {
      console.log("Close!"); // todo stday
      setIsShow(false);
      setModalContent(null);
    };

    return (
      <div>
        <WrappedComponent {...props as P} openModal={openModal} closeModal={closeModal} />
        {isShow && (
          <AntModal visible={true} onCancel={closeModal} footer={null}>
            {modalContent}
          </AntModal>
        )}
      </div>
    );
  };

  return EnhancedComponent;
};

export default withModal;
// can show
// import React, { ComponentType, useState } from 'react';
// import { Modal } from 'react-bootstrap';

// export interface ModalProps {
//   openModal: (content: JSX.Element) => void;
//   closeModal: () => void;
// }

// const withModal = <P extends object>(WrappedComponent: ComponentType<P & ModalProps>) => {
//   const EnhancedComponent: React.FC<P> = (props) => {
//     const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
//     const [isShow, setIsShow] = useState<boolean>(false);

//     const openModal = (content: JSX.Element) => {
//       setIsShow(true);
//       setModalContent(content);
//     };

//     const closeModal = () => {
//       setIsShow(false);
//       setModalContent(null);
//     };

//     return (
//       <>
//         <WrappedComponent {...props as P} openModal={openModal} closeModal={closeModal} />
//         <Modal show={isShow} onHide={closeModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal Title</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {modalContent}
//           </Modal.Body>
//         </Modal>
//       </>
//     );
//   };

//   return EnhancedComponent;
// };

// export default withModal;

// no compile error
// import React, { ComponentType, useState } from 'react';

// export interface ModalProps {
//   openModal: (content: JSX.Element) => void;
//   closeModal: () => void;
// }

// const withModal = <P extends object>(WrappedComponent: ComponentType<P & ModalProps>) => {
//   const EnhancedComponent: React.FC<P> = (props) => {
//     const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

//     const openModal = (content: JSX.Element) => {
//       setModalContent(content);
//     };

//     const closeModal = () => {
//       setModalContent(null);
//     };

//     return (
//       <>
//         <WrappedComponent {...props as P} openModal={openModal} closeModal={closeModal} />
//         {modalContent && (
//           <div className="modal">
//             {modalContent}
//           </div>
//         )}
//       </>
//     );
//   };

//   return EnhancedComponent;
// };

// export default withModal;


// -------

// import React, { useState } from 'react';

// interface WithModalProps {
// }

// const withModal = <P extends object>(Component: React.ComponentType<P & WithModalProps>) => {
//   const WrappedComponent: React.FC<P> = (props) => {
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

//     const openModal = (content: React.ReactNode) => {
//       setIsOpen(true);
//       setModalContent(content);
//     };

//     const closeModal = () => {
//       setIsOpen(false);
//       setModalContent(null);
//     };

//     return (
//       <Component
//         {...props as P}
//         isOpen={isOpen}
//         openModal={openModal}
//         closeModal={closeModal}
//         modalContent={modalContent}
//       />
//     );
//   };

//   return WrappedComponent;
// };

// export default withModal;



// import React, { useState } from 'react';

// const withModal = (WrappedComponent: React.ComponentType<any>) => {
//   const WithModal: React.FC<any> = (props) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//       setIsModalOpen(true);
//     };

//     const closeModal = () => {
//       setIsModalOpen(false);
//     };

//     return (
//       <>
//         <WrappedComponent {...props} openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} />
//       </>
//     );
//   };

//   return WithModal;
// };

// export default withModal;