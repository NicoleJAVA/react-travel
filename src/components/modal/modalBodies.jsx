import React from 'react';
import withModal from './withModal';
import { Button } from 'react-bootstrap';

const Page1ModalBody = () => <div>這是頁面 1 的 Modal 內容。</div>;
const Page2ModalBody = () => <div>這是頁面 2 的 Modal 內容。</div>;

const Page1Component = ({ handleShowModal }) => {
  return (
    <div>
      <h1>頁面 1</h1>
      <Button variant="primary" onClick={handleShowModal}>
        顯示 Modal
      </Button>
    </div>
  );
};

const Page2Component = ({ handleShowModal }) => {
  return (
    <div>
      <h1>頁面 2</h1>
      <Button variant="primary" onClick={handleShowModal}>
        顯示 Modal
      </Button>
    </div>
  );
};

const Page1WithModal = withModal(Page1Component);
const Page2WithModal = withModal(Page2Component);