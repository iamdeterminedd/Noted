import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import NoteCards from './NoteCards';
import NoteModal from './NoteModal';
import Barloader from './Barloader';

const Home = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const {
    data: notes,
    loading,
    error,
  } = useFetch('https://noted-api-d555.onrender.com/notes', update);

  return (
    <>
      <h1>Noted</h1>
      <div>
        <FontAwesomeIcon
          icon={faPlus}
          className="plusIcon"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="container">
        <NoteCards notes={notes} onUpdate={() => setUpdate((prev) => !prev)} />
      </div>
      {showModal && (
        <NoteModal
          onClose={() => setShowModal(false)}
          onUpdate={() => setUpdate((prev) => !prev)}
        />
      )}
    </>
  );
};

export default Home;
