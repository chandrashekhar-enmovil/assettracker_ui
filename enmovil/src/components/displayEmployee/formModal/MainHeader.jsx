// App.js
import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from '@mui/material';
import './App.css';

const ManinHeader = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Button variant='outlined' onClick={handleOpenModal}>Bulk Upload</Button>
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default ManinHeader;
