import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../renderer/App.css';

import plus from '../img/plus.png';
import Modal from './Modal';

export default function MainCom() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="MainPageContainer">
      <h1>Save Time ⌚ when Opening tabs</h1>
      <Link to="/empty">go to empty</Link>
      <section>
        <div className="card">
          <div className="tools">
            <div className="circle">
              <span className="red box" />
            </div>
            <div className="circle">
              <span className="yellow box" />
            </div>
            <div className="circle">
              <span className="green box" />
            </div>
          </div>
          <div
            className="card__content"
            role="button"
            tabIndex={0}
            onClick={handleButtonClick}
            onKeyDown={handleButtonClick}
          >
            <button type="button">
              <img src={plus} alt="plus" width={50} />
            </button>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Modal closeModal={closeModal} closeModalKey={closeModalKey} />
      )}
    </div>
  );
}
